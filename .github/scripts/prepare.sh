#!/usr/bin/env bash
set -euo pipefail

# prepare.sh for remirror/remirror
# Docusaurus 2.4.1, pnpm@9.15.9, Node 24
# Docusaurus path: website/
#
# Clones repo, installs deps, compiles workspace packages (pre-build step).
# Pre-build is required: the Docusaurus site imports @remirror/react, remirror, etc.
# which must be compiled to dist/ before docusaurus build can run.
#
# Does NOT run write-translations or docusaurus build.

REPO_URL="https://github.com/remirror/remirror"
BRANCH="main"
REPO_DIR="source-repo"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== prepare.sh: remirror/remirror ==="

# Use /tmp as HOME so tools like playwright, sharp, npm don't try to write to /root
export HOME="/tmp/remirror-home"
mkdir -p "$HOME"

# Skip optional binary downloads not needed for write-translations/build
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
export PLAYWRIGHT_BROWSERS_PATH="/tmp/remirror-pw-browsers"
export npm_config_cache="/tmp/remirror-npm-cache"
export SHARP_IGNORE_GLOBAL_LIBVIPS=1

# --- Node 24 ---
# Try hostedtoolcache first (fast, no download), fall back to n
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

# --- Clone (skip if already exists) ---
if [ ! -d "$REPO_DIR" ]; then
    echo "[INFO] Cloning repository..."
    git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$REPO_DIR"
else
    echo "[INFO] source-repo/ already exists, skipping clone."
fi

cd "$REPO_DIR"

# --- Apply fixes.json if present ---
FIXES_JSON="$SCRIPT_DIR/fixes.json"
if [ -f "$FIXES_JSON" ]; then
    echo "[INFO] Applying content fixes from fixes.json..."
    node -e "
    const fs = require('fs');
    const path = require('path');
    const fixes = JSON.parse(fs.readFileSync('$FIXES_JSON', 'utf8'));
    for (const [file, ops] of Object.entries(fixes.fixes || {})) {
        if (!fs.existsSync(file)) { console.log('  skip (not found):', file); continue; }
        let content = fs.readFileSync(file, 'utf8');
        for (const op of ops) {
            if (op.type === 'replace' && content.includes(op.find)) {
                content = content.split(op.find).join(op.replace || '');
                console.log('  fixed:', file, '-', op.comment || '');
            } else if (op.type === 'replace') {
                console.log('  skip (find not found):', file, '-', op.comment || '');
            }
        }
        fs.writeFileSync(file, content);
    }
    for (const [file, cfg] of Object.entries(fixes.newFiles || {})) {
        const c = typeof cfg === 'string' ? cfg : cfg.content;
        fs.mkdirSync(path.dirname(file), {recursive: true});
        fs.writeFileSync(file, c);
        console.log('  created:', file);
    }
    "
fi

# --- Install root dependencies (monorepo) ---
echo "[INFO] Installing root dependencies..."
pnpm install --no-frozen-lockfile

# --- Pre-build: compile all workspace packages ---
# pnpm run build = preconstruct fix && preconstruct build && pnpm build:packages && css:copy
# pnpm build:packages = pnpm typecheck && turbo run build (all packages except storybook)
# Note: this step can take 20-40 minutes on first run (100+ packages to compile)
echo "[INFO] Building workspace packages (pre-build — may take 20-40 minutes)..."
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build

echo "[DONE] Repository is ready for docusaurus commands."
