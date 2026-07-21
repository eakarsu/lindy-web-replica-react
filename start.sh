#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir"

[ -d node_modules ] || { printf 'Dependencies are missing; run npm ci before startup.\n' >&2; exit 1; }
[ -d dist ] || { printf 'The production frontend is missing; run npm run build before startup.\n' >&2; exit 1; }
: "${DATABASE_URL:?DATABASE_URL is required}"

export AUTH_SECRET="${AUTH_SECRET:-${JWT_SECRET:-}}"
export PRIVACY_HASH_SECRET="${PRIVACY_HASH_SECRET:-${JWT_REFRESH_SECRET:-}}"
: "${AUTH_SECRET:?AUTH_SECRET or JWT_SECRET is required}"
: "${PRIVACY_HASH_SECRET:?PRIVACY_HASH_SECRET or JWT_REFRESH_SECRET is required}"

export HOST="${HOST:-127.0.0.1}"
export PORT="${PORT:-3001}"
export MIGRATE_ON_START=false
export ALLOWED_ORIGINS="${ALLOWED_ORIGINS:-http://${HOST}:${PORT}}"

exec npm start
