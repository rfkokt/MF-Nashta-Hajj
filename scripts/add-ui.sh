#!/usr/bin/env bash
# ─────────────────────────────────────────────────
# add-ui.sh — Install shadcn components into @nashta/ui-kit
#
# Usage:
#   ./scripts/add-ui.sh accordion          # single
#   ./scripts/add-ui.sh accordion tabs     # multiple
#
# What it does:
#   1. Runs `npx shadcn@latest add <components>`
#   2. Fixes internal imports (@/lib/utils → ../utils/cn)
#   3. Auto-adds export to libs/ui-kit/src/index.ts
#   4. Shows what was installed
# ─────────────────────────────────────────────────
set -euo pipefail

COMPONENTS_DIR="libs/ui-kit/src/components"
BARREL="libs/ui-kit/src/index.ts"

if [ $# -eq 0 ]; then
  echo "❌ Usage: ./scripts/add-ui.sh <component-name> [component-name ...]"
  echo ""
  echo "Examples:"
  echo "  ./scripts/add-ui.sh accordion"
  echo "  ./scripts/add-ui.sh accordion tabs dialog"
  echo ""
  echo "Available components:"
  npx shadcn@latest search shadcn 2>/dev/null || true
  exit 1
fi

echo "🚀 Installing shadcn components: $@"
echo ""

# Track existing files before install
BEFORE=$(ls "$COMPONENTS_DIR"/*.tsx 2>/dev/null | sort)

# 1. Run shadcn CLI
npx shadcn@latest add "$@" --yes --overwrite

# Track new files after install
AFTER=$(ls "$COMPONENTS_DIR"/*.tsx 2>/dev/null | sort)

# Find newly added files
NEW_FILES=$(comm -13 <(echo "$BEFORE") <(echo "$AFTER"))

if [ -z "$NEW_FILES" ]; then
  echo ""
  echo "⚠️  No new component files detected."
  exit 0
fi

echo ""
echo "📁 New files detected:"
echo "$NEW_FILES"
echo ""

# 2. Fix imports in new files
for file in $NEW_FILES; do
  filename=$(basename "$file")
  echo "🔧 Fixing imports in $filename..."

  # Fix @/lib/utils → ../utils/cn
  sed -i '' 's|from "@/lib/utils"|from "../utils/cn"|g' "$file"
  sed -i '' "s|from '@/lib/utils'|from '../utils/cn'|g" "$file"

  # Fix @/components/XYZ → ./XYZ (same directory)
  sed -i '' 's|from "@/components/\([^"]*\)"|from "./\1"|g' "$file"
  sed -i '' "s|from '@/components/\([^']*\)'|from './\1'|g" "$file"

  # Fix @/hooks/XYZ → ../hooks/XYZ
  sed -i '' 's|from "@/hooks/\([^"]*\)"|from "../hooks/\1"|g' "$file"
  sed -i '' "s|from '@/hooks/\([^']*\)'|from '../hooks/\1'|g" "$file"
done

# 3. Auto-export from barrel (index.ts)
echo ""
for file in $NEW_FILES; do
  filename=$(basename "$file" .tsx)

  # Skip if already exported
  if grep -q "from './components/$filename'" "$BARREL" 2>/dev/null; then
    echo "⏭️  $filename already exported in index.ts"
    continue
  fi

  # Extract named exports from the file
  EXPORTS=$(grep -E '^export (function|const|class) ' "$file" | sed -E 's/export (function|const|class) ([A-Za-z0-9_]+).*/\2/' | tr '\n' ', ' | sed 's/,$//')
  TYPES=$(grep -E '^export (type|interface) ' "$file" | sed -E 's/export (type|interface) ([A-Za-z0-9_]+).*/\2/' | tr '\n' ', ' | sed 's/,$//')

  if [ -n "$EXPORTS" ]; then
    echo "" >> "$BARREL"
    echo "export { $EXPORTS } from './components/$filename';" >> "$BARREL"
    echo "✅ Exported { $EXPORTS } from $filename"
  fi

  if [ -n "$TYPES" ]; then
    echo "export type { $TYPES } from './components/$filename';" >> "$BARREL"
    echo "✅ Exported type { $TYPES } from $filename"
  fi
done

echo ""
echo "─────────────────────────────────────────"
echo "✅ Done! Komponen sudah ter-install dan ter-export."
echo ""
echo "Import di MFE:"
for file in $NEW_FILES; do
  filename=$(basename "$file" .tsx)
  echo "  import { $filename } from '@nashta/ui-kit';"
done
echo ""
echo "Komponen akan otomatis muncul di sidebar UI Kit."
echo "─────────────────────────────────────────"
