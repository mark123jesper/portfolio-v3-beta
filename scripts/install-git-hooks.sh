#!/bin/sh
# Copies the tracked hooks in scripts/git-hooks/ into this clone's hooks folder.
# Runs automatically from `npm run prepare` (so a plain `npm install` or
# `npm ci` is enough) and can be run by hand with `npm run hooks:install`.
#
# Never replaces a hook it did not put there: a pre-commit with different
# contents is left untouched unless you pass --force (which backs it up).
set -eu

force=0
for arg in "$@"; do
  case "$arg" in
    --force) force=1 ;;
  esac
done

note() { printf '%s\n' "$*"; }

if ! root=$(git rev-parse --show-toplevel 2>/dev/null); then
  note "Not inside a git checkout — skipping git hook install."
  exit 0
fi

if ! hooks=$(git rev-parse --git-path hooks 2>/dev/null); then
  note "Could not resolve the hooks directory — skipping git hook install."
  exit 0
fi

case "$hooks" in
  /*) ;;
  *) hooks="$root/$hooks" ;;
esac

# Hooks outside the worktree belong to a shared git dir (a linked worktree or a
# separate --git-dir), so writing there would change every other checkout.
case "$hooks/" in
  "$root"/*) ;;
  *)
    if [ "$force" -ne 1 ]; then
      note "Hooks live in a shared git dir ($hooks) — skipping. Use --force to install there anyway."
      exit 0
    fi
    ;;
esac

mkdir -p "$hooks"

installed=0
skipped=0

for hook in "$root"/scripts/git-hooks/*; do
  [ -f "$hook" ] || continue
  name=$(basename "$hook")
  target="$hooks/$name"

  if [ -f "$target" ]; then
    if cmp -s "$hook" "$target"; then
      continue
    fi
    if [ "$force" -ne 1 ]; then
      note "Left your existing $name hook alone (different contents). Run with --force to replace it."
      skipped=$((skipped + 1))
      continue
    fi
    cp "$target" "$target.bak"
    note "Backed up your existing $name to $name.bak"
  fi

  cp "$hook" "$target"
  chmod +x "$target"
  note "Installed $name -> $target"
  installed=$((installed + 1))
done

if [ "$installed" -eq 0 ] && [ "$skipped" -eq 0 ]; then
  note "Git hooks already up to date."
fi
