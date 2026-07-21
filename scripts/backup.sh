#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required" >&2
  exit 2
fi

destination="${1:-backups/lindy-$(date -u +%Y%m%dT%H%M%SZ).dump}"
mkdir -p "$(dirname "$destination")"
umask 077
pg_dump --dbname="$DATABASE_URL" --format=custom --no-owner --no-acl --file="$destination"
pg_restore --list "$destination" >/dev/null
echo "Verified backup: $destination"
