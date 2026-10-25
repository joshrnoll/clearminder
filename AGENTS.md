# Development workflow

Clearminder uses document-driven development. User-facing docs are the product contract.

The core product is an open source API that users can host themselves. It stores data in Postgres. The CLI, MCP, web app, and iOS app are clients of that API.

Before changing behavior, update the relevant docs under `docs/` with the user workflow, commands, inputs, outputs, and errors. Then write code that follows those docs. Keep examples and implementation in sync. Put development-status notes here or in contributor material, not in user-facing docs.
