#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 || -z "${RESTORE_DATABASE_URL:-}" ]]; then
  echo "Usage: RESTORE_DATABASE_URL=postgresql://... $0 BACKUP.dump" >&2
  echo "RESTORE_DATABASE_URL must identify an empty disposable database." >&2
  exit 2
fi

backup="$1"
pg_restore --dbname="$RESTORE_DATABASE_URL" --exit-on-error --no-owner --no-acl "$backup"

DATABASE_URL="$RESTORE_DATABASE_URL" node scripts/verify-database.mjs
echo "Restore and integrity verification passed"
