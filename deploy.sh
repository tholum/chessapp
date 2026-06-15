#!/usr/bin/env bash
# Build and deploy Chess Learner to chess.timholum.com.
# Static Vite SPA -> rsync dist/ to the nginx web root on the server.
set -euo pipefail

REMOTE="root@timholum.com"
REMOTE_DIR="/opt/sites/Chesstimholumcom/"

cd "$(dirname "$0")"

echo "==> Validating opening data (legality)…"
node scripts/validate-openings.mjs

echo "==> Building…"
npm run build

echo "==> Deploying to ${REMOTE}:${REMOTE_DIR}…"
rsync -az --delete dist/ "${REMOTE}:${REMOTE_DIR}"

echo "==> Done. https://chess.timholum.com/"
