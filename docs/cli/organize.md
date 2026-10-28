# Organize your lists

Clarifying an item puts it on a list. Use `list` to see the reminders you have stored. Lists appear as tables by default:

```sh
clearminder list next-actions
clearminder list projects
clearminder list waiting
clearminder list calendar
clearminder list someday
clearminder list reference
```

Add `--json` to a list command when you need its items as a JSON array. For example, run `clearminder list next-actions --json`. The `inbox` shortcut also accepts `--json`.

Use `--context` to narrow next actions, `--in-project` to find items attached to a project, or `--on` to show calendar items for one date:

```sh
clearminder list next-actions --context computer
clearminder list waiting --in-project 2b04eb04-0b68-46d0-bbb2-44749578a50c
clearminder list calendar --on 2026-11-06
```

The CLI stores calendar items on its own list. It does not add events to an external calendar.

## Change an item's details

Use the item's ID to change where it appears. For example, add a context or attach an action to a project:

```sh
clearminder organize fd12274e-1a38-4e21-92a6-b417e3bebd82 --context calls
clearminder organize fd12274e-1a38-4e21-92a6-b417e3bebd82 --in-project 2b04eb04-0b68-46d0-bbb2-44749578a50c
```

To remove either value, use `--clear-context` or `--clear-project`. To rename an action, use `--action`. To change a project's outcome, use `--outcome`.

## Move an item to another list

Use `--as` when your earlier decision changes:

```sh
clearminder organize fd12274e-1a38-4e21-92a6-b417e3bebd82 --as waiting --for Morgan
clearminder organize fd12274e-1a38-4e21-92a6-b417e3bebd82 --as calendar --on 2026-11-06
clearminder organize fd12274e-1a38-4e21-92a6-b417e3bebd82 --as next-action --context computer
clearminder organize fd12274e-1a38-4e21-92a6-b417e3bebd82 --as someday
```

The item keeps its ID. When the new list needs information the item does not have, supply it in the same command. For example, moving an item to Waiting for requires `--for`.

To recover a trashed item, find its ID with `clearminder list trash`, then move it to a list. Use `clearminder show ID` to inspect an item before you move it.

The [command reference](reference.md) lists the allowed fields for each list.
