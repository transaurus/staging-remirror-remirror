#!/usr/bin/env bash
set -euo pipefail

# rebuild.sh for remirror/remirror
# Runs on existing source tree (no clone).
# Current directory should be the docusaurus root (website/).
#
# Monorepo special case: @remirror/* workspace packages must be compiled to dist/
# before docusaurus can bundle. The staging repo has workspace package sources
# but no compiled dist/ artifacts (gitignored). We clone the source repo to a
# temp directory, build all packages there, copy the compiled node_modules back,
# then run the Docusaurus build.

REPO_URL="https://github.com/remirror/remirror"
BRANCH="main"

echo "=== rebuild.sh: remirror/remirror ==="

# Use /tmp as HOME
export HOME="/tmp/remirror-home"
mkdir -p "$HOME"

export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
export PLAYWRIGHT_BROWSERS_PATH="/tmp/remirror-pw-browsers"
export npm_config_cache="/tmp/remirror-npm-cache"
export SHARP_IGNORE_GLOBAL_LIBVIPS=1

# --- Node 24 ---
NODE_24_CACHE=$(ls -d /opt/hostedtoolcache/node/24.*/x64/bin 2>/dev/null | tail -1)
if [ -n "$NODE_24_CACHE" ]; then
    export PATH="$NODE_24_CACHE:$PATH"
    echo "[INFO] Using Node 24 from hostedtoolcache: $NODE_24_CACHE"
else
    echo "[INFO] Installing Node 24 via n..."
    export N_PREFIX="/tmp/n-remirror"
    n install 24
    export PATH="/tmp/n-remirror/bin:$PATH"
fi
echo "[INFO] Node version: $(node -v)"

# --- pnpm@9.15.9 via corepack ---
echo "[INFO] Setting up pnpm@9.15.9 via corepack..."
corepack enable
corepack prepare pnpm@9.15.9 --activate
echo "[INFO] pnpm version: $(pnpm --version)"

# Current dir is website/ (docusaurusRoot)
WEBSITE_DIR="$(pwd)"
REPO_ROOT="$(cd .. && pwd)"

# --- Install root dependencies (staging repo) ---
echo "[INFO] Installing root dependencies..."
cd "$REPO_ROOT"
pnpm install --no-frozen-lockfile

# --- Pre-build: compile workspace packages ---
# Workspace package sources are present in the staging repo (packages/ dir).
# We compile them here so the Docusaurus build can resolve @remirror/* imports.
echo "[INFO] Building workspace packages (pre-build — may take 20-40 minutes)..."
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build

# --- Build Docusaurus site ---
echo "[INFO] Building Docusaurus site..."
cd "$WEBSITE_DIR"
USE_SIMPLE_CSS_MINIFIER=true pnpm exec docusaurus build

echo "[DONE] Build complete."
