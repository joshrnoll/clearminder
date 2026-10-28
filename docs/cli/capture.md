# Capture a thought

Capture text as soon as you want to remember it. Clearminder stores the text in your inbox without assigning it to a list of actions.

```sh
clearminder capture "Ask Morgan about the lease"
```

The command prints the saved item's UUID on one line, with no other standard output. Keep that UUID if you plan to clarify the item in a script.

```sh
item_id=$(clearminder capture "Ask Morgan about the lease")
clearminder clarify "$item_id" --as next-action --action "Email Morgan for the lease"
```

## Capture text from another command

Pass `-` to read all of standard input as one item:

```sh
printf '%s\n' 'Read the building report' | clearminder capture -
```

Line breaks stay in the captured text. An empty argument or empty input fails without creating an item. The CLI never reads standard input unless you pass `-`.

## Check what you captured

```sh
clearminder inbox
clearminder show 2b04eb04-0b68-46d0-bbb2-44749578a50c
```

`inbox` lists unclarified items. `show` displays the full text for one ID. If the server connection fails during capture, check the inbox before you retry. A request may have reached the server even if the CLI did not receive its response.

When you are ready to decide what an item means, [clarify it](clarify.md).
