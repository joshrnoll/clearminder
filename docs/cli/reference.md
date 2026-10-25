# Command reference

Every item ID is a UUID. IDs stay the same when items move between lists. Commands that change data succeed only after the server confirms the write.

## Server and sign-in

| Command | Result |
| --- | --- |
| `clearminder config set url URL` | Save the active server's base URL for the current user. |
| `clearminder config get url` | Print the active server's base URL. |
| `clearminder auth login` | Sign in to the active server. |
| `clearminder auth logout` | Remove the saved login credential for the active server. |

`config set url` saves the URL without contacting the server. `auth login` requires a saved URL and an interactive terminal. It asks for your username and password, hides the password as you type, and verifies the login with the server. On success, it saves a server-issued credential in your user account's credential store and prints the signed-in username and server URL. It does not save your password. On failure, it saves no new credential.

Credentials belong to the server URL used at login. The active URL determines which saved credential the CLI uses. The CLI never sends a credential saved for one URL to another URL. `auth logout` removes the saved credential for the active URL. It does not delete your server account.

Commands that read or change items require a configured URL and a login for that URL. `config get url` and `auth logout` never print credentials.

## Output

`capture` prints the new item's UUID and a newline on standard output. Other commands use human-readable output. `list` and `inbox` display tables unless you pass `--json`. Diagnostics go to standard error.

## Capture and inspect

| Command | Result |
| --- | --- |
| `clearminder capture TEXT` | Save `TEXT` as one inbox item and print its UUID. |
| `clearminder capture -` | Save all of standard input as one inbox item and print its UUID. |
| `clearminder inbox [--json]` | List unclarified items, oldest first. |
| `clearminder show ID` | Show one item, including its text, current list, and relevant fields. |

Empty captured text is an error. `capture` never reads standard input unless its argument is `-`.

## Clarify

`clearminder clarify` opens a fuzzy finder for inbox items. Type part of an item's captured text to narrow the results. An exact phrase is not required. Use the arrow keys to select an item and press Enter to open its clarification wizard. Press Escape to leave without changing an item. If the inbox is empty, the command prints `Inbox is empty` and exits successfully.

`clearminder clarify ID` opens the wizard for that inbox item without the finder. `clearminder clarify ID DECISION_FLAG` starts the wizard at the selected decision. It prompts for any required fields and asks for confirmation. These forms require a terminal. Only one decision flag is allowed, and it requires an ID. Do not combine a decision flag with `--as` or field options.

`clearminder clarify ID --as KIND [OPTIONS]` makes a complete decision without prompts. It requires an ID and all fields listed for that kind. A successful clarification removes the item from the inbox. A failed or canceled clarification leaves it there.

The required and optional field options in this table apply to `--as`. The wizard asks for these fields when you use a decision flag.

| `KIND` | Decision flag | Required options for `--as` | Optional options for `--as` | Result |
| --- | --- | --- | --- | --- |
| `next-action` | `--next-action` | `--action TEXT` | `--context NAME`, `--in-project ID` | Put the item on Next actions. |
| `project` | `--project` | `--outcome TEXT`, `--next TEXT` | `--context NAME` | Turn the item into a project and create its first next action. |
| `waiting` | `--waiting` | `--action TEXT`, `--for PERSON` | `--follow-up DATE`, `--in-project ID` | Put the item on Waiting for. |
| `calendar` | `--calendar` | `--action TEXT`, either `--on DATE` or `--at TIMESTAMP` | `--in-project ID` | Put the item on Calendar. |
| `someday` | `--someday` | None | `--title TEXT` | Put the item on Someday. |
| `reference` | `--reference` | None | `--title TEXT` | Put the item on Reference. |
| `done` | `--done` | None | None | Record that you completed the item. |
| `trash` | `--trash` | None | None | Remove the item from active lists. |

For `project`, the captured UUID becomes the project UUID and the new action gets a separate UUID. The server saves both together. `--in-project ID` must name an existing project. `DATE` uses `YYYY-MM-DD`. `TIMESTAMP` uses RFC 3339 with a time zone offset. `--on` and `--at` cannot appear together.

## List and organize

`clearminder list KIND [--json]` accepts `inbox`, `next`, `projects`, `waiting`, `calendar`, `someday`, `reference`, `done`, or `trash`. `clearminder inbox` is the short form of `clearminder list inbox`.

By default, each list is a table with a header row. The first column is `ID`; other columns show the fields relevant to that list. Pass `--json` after the list name to get an array of item objects instead. `clearminder inbox --json` has the same output as `clearminder list inbox --json`. An empty list succeeds, with a header but no item rows in table mode and `[]` in JSON mode.

Each JSON item has `id`, `kind`, and `text`. Other fields appear when they apply, including `action`, `outcome`, `context`, `project_id`, `person`, `on`, `at`, and `follow_up`. Field names use snake case. For example, `clearminder list next --json` can return:

```json
[
  {
    "id": "fd12274e-1a38-4e21-92a6-b417e3bebd82",
    "kind": "next-action",
    "text": "Check renewal requirements",
    "action": "Check renewal requirements",
    "context": "computer",
    "project_id": "2b04eb04-0b68-46d0-bbb2-44749578a50c"
  }
]
```

| Option | Applies to | Result |
| --- | --- | --- |
| `--context NAME` | `list next` | Show actions with that context. |
| `--in-project ID` | `list next`, `list waiting`, `list calendar` | Show items attached to that project. |
| `--on DATE` | `list calendar` | Show items on that date. |

`clearminder organize ID OPTIONS` changes an item that has left the inbox. Supply at least one option. The item keeps its ID. You can change its action with `--action TEXT`, a project's outcome with `--outcome TEXT`, or a Someday or Reference title with `--title TEXT`.

Use `--context NAME` or `--clear-context` on a next action. Use `--in-project ID` or `--clear-project` on a next action, Waiting for item, or Calendar item. Use `--follow-up DATE` or `--clear-follow-up` on a Waiting for item. To change a Calendar date, use `--on DATE` or `--at TIMESTAMP`.

Use `--as KIND` to move an item to `next-action`, `waiting`, `calendar`, `someday`, `reference`, `done`, or `trash`. The item must have all fields required by the destination. Supply missing fields with the options in the Clarify table. You cannot use `organize` to turn an existing item into a project or to move a project to another kind.

Moving an item clears fields that do not apply to its new list. The original captured text stays on the item. If you do not supply `--title` for Someday or Reference, the list displays that original text.

`list projects` marks an active project with no current next action, Waiting for item, or Calendar item as `Needs next action`. Add a reminder by clarifying another inbox item and attaching it with `--in-project ID`.

## Errors and write behavior

| Exit code | Meaning |
| --- | --- |
| `0` | The command succeeded. |
| `2` | Invalid command, option, or item data, or an interactive command without a terminal. |
| `3` | Missing server URL, no login for that URL, or rejected credentials. |
| `4` | The server could not be reached or returned an error. |
| `5` | The ID does not exist. |
| `6` | The item changed since the CLI read it. |

Errors go to standard error, including when a list uses `--json`. A validation error leaves data unchanged. Each clarification or organization change is atomic. The CLI does not queue writes while offline. A lost connection can leave the result of a write unknown, so inspect the item or list before retrying.
