#!/bin/sh
# Copies the tracked hooks in scripts/git-hooks/ into this clone's hooks folder.
# Safe to re-run; keeps a .bak of any hook it would otherwise overwrite.
set -eu

root=$(git rev-parse --show-toplevel)
hooks=$(git rev-parse --git-path hooks)
case "$hooks" in
  /*) ;;
  *) hooks="$root/$hooks" ;;
esac

mkdir -p "$hooks"

for hook in "$root"/scripts/git-hooks/*; do
  [ -f "$hook" ] || continue
  name=$(basename "$hook")

  if [ -f "$hooks/$name" ] && ! cmp -s "$hook" "$hooks/$name"; then
    cp "$hooks/$name" "$hooks/$name.bak"
    echo "Backed up your existing $name to $name.bak"
  fi

  cp "$hook" "$hooks/$name"
  chmod +x "$hooks/$name"
  echo "Installed $name -> $hooks/$name"
done

echo "Done. Uninstall by deleting the files above."
