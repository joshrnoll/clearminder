#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 300000}'

REPO_DIR="${CLAUDE_PROJECT_DIR:-/home/user/clearminder}"

# Install dependencies
echo "[session-start] Installing root dependencies..."
npm install --prefix "$REPO_DIR"

echo "[session-start] Installing UI dependencies..."
npm install --prefix "$REPO_DIR/ui"

echo "[session-start] Installing API dependencies..."
npm install --prefix "$REPO_DIR/api"

# Kill any leftover dev server from a previous session
# Use character class to prevent the pattern from matching this script's own process
pkill -f "vit[e]" 2>/dev/null || true
sleep 1

# Start Vite dev server in the background
echo "[session-start] Starting Vite dev server on port 5173..."
nohup npm --prefix "$REPO_DIR/ui" run dev -- --host 0.0.0.0 --port 5173 \
  > /tmp/vite-dev.log 2>&1 &

# Wait for Vite to be ready (up to 15s)
for i in $(seq 1 15); do
  if curl -sf http://localhost:5173/ > /dev/null 2>&1; then
    echo "[session-start] Vite dev server is ready at http://localhost:5173"
    break
  fi
  sleep 1
done

echo "[session-start] Done."
