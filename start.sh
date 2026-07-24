#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir"

[ -f .env ] || { printf 'Missing .env; copy .env.example and configure it.\n' >&2; exit 1; }
set -a
# shellcheck disable=SC1091
source .env
set +a

[ -d node_modules ] || { printf 'Dependencies are missing; run npm ci before startup.\n' >&2; exit 1; }
[ -d dist ] || { printf 'The production frontend is missing; run npm run build before startup.\n' >&2; exit 1; }
: "${DATABASE_URL:?DATABASE_URL is required}"

export AUTH_SECRET="${AUTH_SECRET:-${JWT_SECRET:-}}"
export PRIVACY_HASH_SECRET="${PRIVACY_HASH_SECRET:-${JWT_REFRESH_SECRET:-}}"
: "${AUTH_SECRET:?AUTH_SECRET or JWT_SECRET is required}"
: "${PRIVACY_HASH_SECRET:?PRIVACY_HASH_SECRET or JWT_REFRESH_SECRET is required}"

for port_name in BACKEND_PORT FRONTEND_PORT; do
  value="${!port_name:-}"
  [[ "$value" =~ ^[0-9]+$ ]] && (( value >= 1024 && value <= 65535 )) || { echo "$port_name must be an explicit integer between 1024 and 65535" >&2; exit 1; }
done
[[ "$BACKEND_PORT" != "$FRONTEND_PORT" ]] || { echo "BACKEND_PORT and FRONTEND_PORT must differ" >&2; exit 1; }
for assigned_port in "$BACKEND_PORT" "$FRONTEND_PORT"; do
  lsof -nP -iTCP:"$assigned_port" -sTCP:LISTEN >/dev/null 2>&1 && { echo "Assigned port $assigned_port is occupied" >&2; exit 1; }
done

export HOST="127.0.0.1"
export PORT="$BACKEND_PORT"
export MIGRATE_ON_START=false
export ALLOWED_ORIGINS="${ALLOWED_ORIGINS:-http://${HOST}:${FRONTEND_PORT}}"
export VITE_API_PROXY_TARGET="http://127.0.0.1:$BACKEND_PORT"

backend_pid=''
frontend_pid=''
cleanup() {
  [[ -n "$backend_pid" ]] && kill "$backend_pid" 2>/dev/null || true
  [[ -n "$frontend_pid" ]] && kill "$frontend_pid" 2>/dev/null || true
  wait "$backend_pid" "$frontend_pid" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

npm start &
backend_pid=$!
attempt=0
while ! lsof -nP -iTCP:"$BACKEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  kill -0 "$backend_pid" 2>/dev/null || { echo "Backend exited before binding $BACKEND_PORT" >&2; wait "$backend_pid"; exit 1; }
  (( attempt < 120 )) || { echo "Backend did not bind $BACKEND_PORT within 30 seconds" >&2; exit 1; }
  sleep 0.25
  attempt=$((attempt + 1))
done
npm run dev -- --host 127.0.0.1 --port "$FRONTEND_PORT" --strictPort &
frontend_pid=$!
wait "$backend_pid" "$frontend_pid"
