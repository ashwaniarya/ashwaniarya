#!/usr/bin/env bash
# Deterministic repository snapshot for the context-preparation skill.
#
# Usage (from the repository root):
#   bash .claude/skills/context-preparation/scripts/collect-repo-context.sh [keyword ...]
#
# Prints a compact, read-only overview that a Context Brief is built from:
# branch and recent history, package scripts, ground-truth docs, a source map,
# the test inventory, environment readiness, and grep hits for each keyword.
# It never writes to the repository.
set -euo pipefail

repository_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$repository_root"

recent_commit_count=15
maximum_keyword_matches=40

print_heading() {
  printf '\n== %s ==\n' "$1"
}

print_heading "Branch and recent history"
printf 'branch: %s\n' "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'not a git repository')"
git log --oneline -n "$recent_commit_count" 2>/dev/null || echo "(no git history)"

print_heading "Package scripts"
if [ -f package.json ]; then
  node -e '
    const packageJson = require("./package.json");
    for (const [name, command] of Object.entries(packageJson.scripts ?? {})) {
      console.log(`${name}: ${command}`);
    }
  ' 2>/dev/null || grep -A 20 '"scripts"' package.json
else
  echo "(no package.json)"
fi

print_heading "Ground-truth documents"
for document in README.md docs/architechture.md .cursor/rules/es-lint.mdc CLAUDE.md; do
  if [ -f "$document" ]; then
    printf '%s (%s lines)\n' "$document" "$(wc -l < "$document")"
  fi
done
if [ -d docs/plans ]; then
  printf 'docs/plans: %s\n' "$(ls docs/plans | tr '\n' ' ')"
fi
if [ -d docs/specs ]; then
  printf 'docs/specs: %s\n' "$(ls docs/specs | tr '\n' ' ')"
fi
if [ -d docs/context ]; then
  printf 'docs/context (previous briefs): %s\n' "$(ls docs/context | tr '\n' ' ')"
fi

print_heading "Source map"
for source_directory in app/components app/config app/constants app/work design-system packages scripts; do
  if [ -d "$source_directory" ]; then
    file_count="$(find "$source_directory" -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.mjs' \) ! -name '*.test.*' | wc -l | tr -d ' ')"
    printf '%s: %s source files\n' "$source_directory" "$file_count"
  fi
done
if [ -d app/components ]; then
  printf 'component groups: %s\n' "$(find app/components -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort | tr '\n' ' ')"
fi
if [ -d app ]; then
  printf 'routes:\n'
  find app -name 'page.tsx' -o -name 'layout.tsx' -o -name 'route.ts' | sort | sed 's/^/  /'
fi

print_heading "Test inventory"
test_file_count="$(find app design-system .claude/skills -type f \( -name '*.test.ts' -o -name '*.test.tsx' \) 2>/dev/null | wc -l | tr -d ' ')"
printf 'test files: %s\n' "$test_file_count"
printf 'runner: %s\n' "$( [ -f vitest.config.ts ] && echo 'vitest (npm test)' || echo 'unknown' )"

print_heading "Environment"
printf 'node: %s\n' "$(node --version 2>/dev/null || echo 'missing')"
printf 'node_modules: %s\n' "$( [ -d node_modules ] && echo 'present' || echo 'missing (run npm ci before npm test)' )"
printf 'lockfiles: %s\n' "$(ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null | tr '\n' ' ')"
printf 'working tree: %s\n' "$( [ -z "$(git status --porcelain 2>/dev/null)" ] && echo 'clean' || echo 'has uncommitted changes' )"

print_heading "Keyword matches"
if [ "$#" -eq 0 ]; then
  echo "(no keywords given; pass component, route, or domain words as arguments)"
else
  for keyword in "$@"; do
    printf -- '-- %s --\n' "$keyword"
    if command -v rg >/dev/null 2>&1; then
      rg -l --no-messages -i "$keyword" app design-system packages docs scripts 2>/dev/null | sort | head -n "$maximum_keyword_matches" || true
    else
      grep -ril "$keyword" app design-system packages docs scripts 2>/dev/null | sort | head -n "$maximum_keyword_matches" || true
    fi
  done
fi
