# ClearMinder — Product Spec

> **Status:** v2.0 design baseline. The v1 PWA is preserved at the `v1-pwa-archive` git tag.
> This document is the rebuild contract. Code comes after the spec is approved.

## 1. Vision

ClearMinder is a **self-hosted, agent-first GTD (Getting Things Done) system** for
people who want their task list to be programmable — not just a pretty app.

The product is a single HTTP API that owns the GTD domain. Everything else —
web UI, iOS app, CLI, MCP server, automated agents — is a thin client over
that one API.

The user can run ClearMinder:

- on a homelab behind Tailscale
- on a public VPS behind a reverse proxy
- on a Raspberry Pi
- in the cloud

…with one container and one persistent data directory.

## 2. Goals

- **Agent-first.** Coding agents (Pi, Codex, Claude Code, OpenCode) and
  long-running agent harnesses (Hermes, cron, MCP) can capture, clarify,
  organize, reflect, and engage without screen-scraping.
- **Own your data.** One container, one volume, easy backup and restore.
  No vendor. No third-party SaaS.
- **Internet-safe.** Built-in auth, OIDC for public deployments,
  no implicit public exposure.
- **Boring technology.** Go + SQLite + React. Few moving parts.
- **One canonical write path.** The API is the only writer. UI, CLI,
  and agents all go through it.

## 3. Non-Goals

- Multi-tenant SaaS hosting.
- Real-time collaborative editing.
- Mobile-first design. (Capture works great on mobile. Management does not.)
- Calendar sync. (Hard-landscape items get exported to Google/Apple Calendar
  via the user, not the app.)
- AI auto-clarification of inbox items. (Humans clarify, with optional
  agent help as a *proposal* workflow.)
- Email ingestion.

## 4. Users

A single user owns an instance. A small trusted circle may share an instance
if they want — ClearMinder will support multiple users, but does not target
team workflows, RBAC, or per-user permissions in v2.

The primary user:

- runs a homelab or VPS
- uses multiple machines, including a work laptop
- automates personal workflows with agents
- wants their GTD data portable, exportable, and inspectable

## 5. Core Domain

A pragmatic subset of David Allen's GTD.

### Entities

| Entity       | Purpose                                                    |
|--------------|------------------------------------------------------------|
| `Item`       | A single tracked thing. Type determines semantics.         |
| `Project`    | An outcome requiring more than one action.                 |
| `Context`    | A tag for where/with-what an action can be done.           |
| `Event`      | An audit log entry. Every mutation produces one.           |
| `User`       | The human (or an agent acting as a user).                  |
| `ApiToken`   | A scoped token for CLI / agent access.                     |

### Item types

- `inbox` — captured but not yet clarified.
- `next_action` — the next physical, visible step on a project or standalone.
- `waiting_for` — delegated; we are tracking a follow-up.
- `someday_maybe` — possible future commitment; not active.
- `reference` — useful, not actionable.
- `agenda` — to discuss with a person or group.
- `project` — a desired outcome with at least one active next action.

### Item states

- `open` — active.
- `completed` — done; preserved with `completed_at`.
- `cancelled` — dropped with intent; preserved.
- `archived` — moved out of active lists; preserved.

Soft delete only. Hard delete is an admin operation, never the default.

### Project rules

- An `active` project **must** have at least one open `next_action`.
  Violations are surfaced in the dashboard and as a "needs next action" hint
  to agents.
- Projects may also live in `someday_maybe`, `waiting`, or `completed`.

### Contexts

Free-form string tags (e.g. `errand`, `call`, `computer`, `chore`).
Users define their own taxonomy. The app does not enforce a list.

### Due dates

Per-item `due` field (`YYYY-MM-DD`). Used only for soft nudges:
"Overdue", "Due today", "Due soon (7 days)".

Calendar items are a separate export concern. ClearMinder is not a
calendar replacement.

## 6. Interface Surfaces

Everything is a client of the API. Nothing else.

### 6.1 HTTP API (canonical)

Command-oriented REST. Every mutation is a named command returning the
resulting entity and an `ok` flag.

Examples (not exhaustive — the full OpenAPI is the contract):

```
POST   /v1/commands/capture-inbox
GET    /v1/inbox
POST   /v1/commands/clarify-inbox-item
POST   /v1/commands/create-project
POST   /v1/commands/add-next-action
GET    /v1/projects
GET    /v1/projects/{id}
GET    /v1/next-actions
POST   /v1/commands/complete-item
POST   /v1/commands/defer-item
GET    /v1/contexts
GET    /v1/dashboard/today
POST   /v1/commands/start-weekly-review
GET    /v1/events
```

Conventions:

- JSON in, JSON out.
- Every mutation returns `{ ok, item|project, event }` so agents can confirm.
- Idempotency keys supported via `Idempotency-Key` header.
- Dry-run variants (`?dry_run=true`) for batch actions.
- Errors use RFC 7807 problem details.

### 6.2 Web UI

A single-page React app, served by the same Go binary as static assets.
Optimized for the daily scan:

- inbox count
- one-tap capture
- one-tap complete
- project list with next-action health
- context-grouped next actions
- weekly review wizard

Refresh is user-initiated. The app does not auto-rebuild state in the
background.

### 6.3 CLI

A Go binary. Single static build, distributable via:

- Homebrew tap (`brew install joshrnoll/tap/clearminder`)
- GitHub release binaries
- `docker exec clearminder clearminder ...` as a fallback

Every command supports `--json`. No business logic in the CLI — it calls
the API.

Examples:

```bash
clearminder inbox add "Renew car registration"
clearminder inbox list --json
clearminder project create "Move to Wisconsin" --outcome "Settled in Madison"
clearminder next-action add \
  --project "Move to Wisconsin" \
  --context errand \
  "Buy packing tape"
clearminder item complete act_01J...
clearminder review weekly --dry-run
```

A companion `SKILL.md` is published with the CLI so agent harnesses know
the command surface, expected JSON shape, and safety rules.

### 6.4 MCP server (optional, post-v1)

A thin adapter that wraps the same API and exposes a small set of
semantic tools. Deferred to a later phase. The CLI + `SKILL.md` is the
primary agent interface for v1.

### 6.5 iOS app (deferred)

SwiftUI. v1 scope: capture, list inbox, list next actions, complete item.
Out of scope for v1: weekly review, project editing, offline write queue.
The iOS app talks to the same API as everything else.

## 7. Auth

Two modes, both supported in v1.

### Local auth

- email + Argon2id password
- secure HTTP-only session cookies
- optional API tokens for CLI / agents

### OIDC

- recommended for internet-exposed deployments
- configurable issuer, client ID/secret, redirect URL
- email allowlist and/or domain allowlist
- tested against Authentik, Authelia, Keycloak, Google, Cloudflare Access

### First-run bootstrap

- container starts with no users
- `clearminder admin init` (CLI inside the container) creates the first
  admin via a one-time bootstrap token from the environment
- first user is admin; subsequent users are created by the admin or via OIDC

### API tokens

- scoped (`inbox:read`, `inbox:write`, `items:read`, `items:write`,
  `projects:read`, `projects:write`, `admin`)
- revocable
- created via web UI or CLI
- not created by default; only when a real use case appears

## 8. Persistence

SQLite (single file) in v1. Postgres is not a v1 target.

The DB lives in a single volume mount, e.g. `/data/clearminder.db`.

### Schema (sketch)

```sql
users           (id, email, password_hash, role, created_at)
sessions        (id, user_id, token_hash, expires_at, ...)
api_tokens      (id, user_id, name, token_hash, scopes, ...)

items           (id, type, status, title, body, context, project_id,
                 due, defer_until, source, completed_at, ...)

projects        (id, name, desired_outcome, status, ...)

contexts        (id, name)

events          (id, actor_type, actor_id, action, entity_type,
                 entity_id, before, after, created_at)
```

`events` is the audit journal. Every mutation writes one row.

### Migrations

- `goose` migrations in `/migrations`
- applied automatically on container start
- versioned, reversible

### Backups

- `sqlite3 .backup` while the app is running, or
- stop container, copy the file, restart

No external backup service. The user owns the volume.

## 9. Tech Stack

| Layer       | Choice                                          |
|-------------|-------------------------------------------------|
| Language    | Go 1.22+                                        |
| HTTP        | `net/http` + `chi`                              |
| DB          | SQLite (`modernc.org/sqlite` or `mattn/go-sqlite3`) |
| SQL helpers | `sqlc` for typed queries, or `sqlx` if simpler  |
| Migrations  | `goose`                                         |
| CLI         | `cobra`                                         |
| Auth        | `golang.org/x/oauth2` + `coreos/go-oidc/v3`     |
| Hashing     | `argon2` (argon2id)                             |
| Web         | React + Vite + TypeScript + Tailwind            |
| Build       | Web built into the Go binary via `embed`        |
| Container   | Single `Dockerfile` (multi-stage)               |
| iOS         | SwiftUI (deferred)                              |

## 10. Repository Layout

```
.
├── SPEC.md              this document
├── README.md
├── LICENSE
├── Dockerfile
├── .gitignore
├── assets/              logo and favicon assets
│   └── favicon/
├── cmd/
│   ├── clearminder/     Go API + web server entrypoint
│   └── cli/             Go CLI entrypoint
├── internal/
│   ├── domain/          GTD business logic (pure)
│   ├── store/           SQLite persistence
│   ├── http/            HTTP handlers and middleware
│   ├── auth/            sessions, tokens, OIDC
│   └── config/          env loading
├── migrations/          goose SQL migrations
├── web/                 React + Vite app
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/
│   ├── architecture.md  diagrams and rationale
│   ├── deployment.md    self-host, proxy, OIDC
│   └── api/             OpenAPI spec
└── scripts/             build / dev helpers
```

## 11. Deployment

A single container image, exposed however the user wants.

```bash
docker run -d \
  --name clearminder \
  -p 8080:8080 \
  -v clearminder-data:/data \
  -e GTD_BASE_URL=https://gtd.example.com \
  -e GTD_AUTH_MODE=oidc \
  -e GTD_OIDC_ISSUER_URL=... \
  ghcr.io/joshrnoll/clearminder:latest
```

The app does not bake in TLS. Reverse proxy responsibilities live outside
the container. The app only needs to know its public base URL and to
trust forwarded headers from the proxy.

The CLI is shipped as a separate binary, installable via Homebrew tap or
downloaded from GitHub releases.

## 12. Phased Delivery

### Phase 1 — Domain + API

- SQLite schema and migrations
- core entities and commands
- OpenAPI
- tests
- local auth

### Phase 2 — Web UI

- React app
- dashboard, inbox, projects, next actions
- complete / defer / clarify flows

### Phase 3 — CLI

- `clearminder` binary
- full command surface
- `--json` everywhere
- Homebrew tap and GitHub releases

### Phase 4 — OIDC

- configurable OIDC provider
- allowlists
- docs for common providers

### Phase 5 — iOS

- SwiftUI app
- capture, list, complete
- offline capture queue

### Phase 6 — MCP (optional)

- thin adapter over the API
- only if a real use case demands it

## 13. Open Questions

These are explicitly deferred and called out so they don't get
back-of-the-napkin'd later:

- Multi-user permission model beyond admin / non-admin.
- Webhooks for external triggers.
- Bidirectional Obsidian sync.
- Markdown export format and cadence.
- Per-project templates.
- Recurring actions.

If a question isn't on this list and isn't in `§6 Interface Surfaces`,
it is not a v1 feature.
