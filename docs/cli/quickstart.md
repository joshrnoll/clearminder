# Quickstart: capture and clarify an item

Capture a thought, turn it into a project and a next action, then find that action on your list. You need the `clearminder` CLI, your server URL, and a user account.

1. Connect to your server.

   ```sh
   clearminder config set url https://clearminder.example.com
   clearminder auth login
   ```

   Enter your username and password when prompted. The CLI confirms your username and server URL.

2. Capture the thought.

   ```sh
   clearminder capture "Renew passport"
   ```

   The CLI prints the saved item's UUID on one line:

   ```text
   2b04eb04-0b68-46d0-bbb2-44749578a50c
   ```

3. Look at the inbox.

   ```sh
   clearminder inbox
   ```

   The inbox table includes your new item:

   ```text
   ID                                    TEXT
   2b04eb04-0b68-46d0-bbb2-44749578a50c  Renew passport
   ```

4. Clarify the item.

   ```sh
   clearminder clarify
   ```

   Type `passport` in the fuzzy finder. Select `Renew passport` and press Enter. Choose **Project** in the wizard. Enter `Passport renewed` as the outcome and `Check renewal requirements` as the first next action. Set its context to `computer` and confirm the decision. The CLI prints the captured item's UUID:

   ```text
   2b04eb04-0b68-46d0-bbb2-44749578a50c
   ```

5. Find the action.

   ```sh
   clearminder list next-actions --context computer
   ```

   The table includes the action and its project:

   ```text
   ID                                    ACTION                      CONTEXT   PROJECT
   fd12274e-1a38-4e21-92a6-b417e3bebd82  Check renewal requirements  computer  Passport renewed
   ```

`2b04eb04-0b68-46d0-bbb2-44749578a50c` is no longer in the inbox. The clarification saved the project and its first action together. Your IDs will differ from the examples.

To see the other decisions, use [Clarify inbox items](clarify.md). To change an item's list or details later, use [Organize your lists](organize.md).
