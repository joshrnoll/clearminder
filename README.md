<img src="assets/favicon/android-chrome-192x192.png" alt="ClearMinder" width="96" style="border-radius: 18px;" />

# ClearMinder

> **An agent-first, self-hosted GTD system.**
> One API. CLI. Web. iOS. SQLite. Your machine.

ClearMinder is a [Getting Things Done](https://gettingthingsdone.com/) app
designed to be operated by both humans and coding agents. It is a single
HTTP API that owns the GTD domain; every other surface — web, CLI, iOS —
is a thin client over that one API.

This repository is being rebuilt from scratch on a new architecture
(Go + SQLite + React). The v1 PWA is preserved at the
[`v1-pwa-archive`](../../tags/v1-pwa-archive) tag for reference.

## Status

**Spec phase.** See [`SPEC.md`](./SPEC.md) for the rebuild contract. No
code yet.

## The Idea in One Paragraph

A single-user GTD app you can run on a Raspberry Pi, a homelab box, or
a VPS, behind Tailscale or behind a reverse proxy. The HTTP API is the
canonical write path. A Go CLI is the primary agent interface — designed
for Pi, Codex, Claude Code, OpenCode, Hermes, and cron jobs. A React web
UI is for the daily glance. An iOS app covers capture on the go. SQLite
is the database. One container, one volume, one backup file.

## Interface Surfaces

| Surface  | Purpose                                                     |
|----------|-------------------------------------------------------------|
| API      | The only writer. Command-oriented REST.                     |
| Web      | React SPA for the daily scan. Served by the same container. |
| CLI      | `clearminder` — agent-first, `--json` everywhere.           |
| iOS      | SwiftUI, capture + complete (Phase 5).                      |
| MCP      | Optional, post-v1, only if a real use case appears.         |

## Why This Rebuild

The v1 PWA proved that a self-hosted GTD app is useful. It did not
prove that a PWA-first architecture is the right foundation for an
agent-first product. The rebuild keeps the name, the icon, and the
intent — and replaces the architecture with one designed for agents
first, humans second.

See [`SPEC.md`](./SPEC.md) for the full product spec, including:

- domain model
- API shape
- auth model (local + OIDC)
- tech stack
- deployment model
- phased delivery plan

## Repository Layout

```
SPEC.md              product spec (the rebuild contract)
README.md            this file
LICENSE
Dockerfile           (Phase 1)
assets/              logo and favicon
cmd/                 Go entrypoints
internal/            domain, store, http, auth
migrations/          goose SQL
web/                 React + Vite
docs/                architecture, deployment, API
```

## License

MIT. See [`LICENSE`](./LICENSE).
