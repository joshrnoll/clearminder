# Clarify inbox items

Run `clearminder clarify` at a terminal to open a fuzzy finder for your inbox. Type part of a captured item's text to narrow the results. You do not need an exact phrase. Select an item with the arrow keys and press Enter to open its clarification wizard. Press Escape to close the finder without changing an item.

```sh
clearminder clarify
```

If you already have an item's UUID, open its wizard directly:

```sh
clearminder clarify 2b04eb04-0b68-46d0-bbb2-44749578a50c
```

The wizard asks what the item means, whether it needs action, and where its reminder belongs. If you cancel before confirming, the item stays in the inbox. One confirmation saves the decision, removes the item from the inbox, and prints its UUID.

## Choose a place for the item

Use these decisions in the guided flow:

| Decision | Use it when | Information to enter |
| --- | --- | --- |
| Next action | You can take one concrete action as soon as your context allows. | The action; optionally a context and project. |
| Project | The outcome takes more than one action. | The outcome and one current next action. |
| Waiting for | Someone else has the next move. | What you are waiting for and the person. |
| Calendar | The action belongs on a specific date or at a specific time. | The action and its date or time. |
| Someday | You may act later, but you are not committed now. | An optional title. |
| Reference | You want to keep the information without an action. | An optional title. |
| Done | You handled the action while clarifying it. | No other information. |
| Trash | You do not need to keep the item on an active list. | No other information. |

Use **Done** after you actually handle a short action. The CLI does not do the action for you. Trash remains available on the trash list until you choose to refile it.

## Start at a decision

If you know where an item belongs, pass its UUID and a decision flag. The wizard skips the decision questions, asks for the fields that decision needs, and asks you to confirm before saving.

```sh
clearminder clarify 2b04eb04-0b68-46d0-bbb2-44749578a50c --project
clearminder clarify fd12274e-1a38-4e21-92a6-b417e3bebd82 --next-action
clearminder clarify 592e2728-2fbb-4416-996b-f3f54b9d98e4 --waiting
```

Other decision flags are `--calendar`, `--someday`, `--reference`, `--done`, and `--trash`. Use one decision flag per command. To attach an action to an existing project, choose Next action and enter the project in the wizard.

## Clarify an item in a script

Pass a UUID, `--as`, and the fields required by that decision. The command does not prompt when `--as` is present. Do not combine `--as` with a decision flag.

```sh
clearminder clarify 2b04eb04-0b68-46d0-bbb2-44749578a50c --as next-action --action "Email Morgan for the lease" --context computer
clearminder clarify fd12274e-1a38-4e21-92a6-b417e3bebd82 --as waiting --action "Lease draft from Morgan" --for Morgan
clearminder clarify 592e2728-2fbb-4416-996b-f3f54b9d98e4 --as calendar --action "Submit renewal" --on 2026-11-06
clearminder clarify b48a60e9-60d1-4f31-aaf4-7558fb386f86 --as project --outcome "Passport renewed" --next "Check renewal requirements" --context computer
clearminder clarify 4c872202-60df-451f-80d2-7db3f89df245 --as reference
```

Use `--in-project UUID` with `--as next-action`, `--as waiting`, or `--as calendar` to attach the item to an existing project.

Use `--at` with an RFC 3339 timestamp instead of `--on` when the time matters. For example, `--at 2026-11-06T09:00:00-05:00` records 9 a.m. with its time zone offset. A calendar item is a Clearminder reminder; the CLI does not sync an external calendar.

For every decision and option, see the [command reference](reference.md). To change a decision after you save it, [organize the item](organize.md).
