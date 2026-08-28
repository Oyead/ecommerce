#!/usr/bin/env bash
set -uo pipefail
SERVER_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SERVER_DIR"
mkdir -p logs
LOG="$SERVER_DIR/logs/server.log"

pkill -f "node index.js" 2>/dev/null || true
sleep 2
nohup node index.js </dev/null >"$LOG" 2>&1 &
for i in $(seq 1 30); do curl -s --max-time 2 http://localhost:4000/health >/dev/null 2>&1 && break; sleep 1; done
echo "backend: $(curl -s --max-time 3 http://localhost:4000/health)"

B="http://localhost:4000/api"

echo "== 1. signup with EXISTING phone (01118991707) but new email -> expect 409 phone error =="
curl -s -o /tmp/r1.json -w "HTTP:%{http_code}\n" -X POST "$B/auth/signup" -H 'Content-Type: application/json' \
  -d '{"name":"Dup Phone","email":"newuser-phone@example.com","password":"Password1","phone":"01118991707"}'
cat /tmp/r1.json; echo

echo "== 2. signup with EXISTING email (eyadswailam@gmail.com) -> expect 409 email error =="
curl -s -o /tmp/r2.json -w "HTTP:%{http_code}\n" -X POST "$B/auth/signup" -H 'Content-Type: application/json' \
  -d '{"name":"Dup Email","email":"eyadswailam@gmail.com","password":"Password1","phone":"01234567890"}'
cat /tmp/r2.json; echo

echo "== 3. signup with all-new values -> expect 201 success =="
curl -s -o /tmp/r3.json -w "HTTP:%{http_code}\n" -X POST "$B/auth/signup" -H 'Content-Type: application/json' \
  -d '{"name":"Fresh New","email":"fresh.new@example.com","password":"Password1","phone":"01666001234"}'
cat /tmp/r3.json; echo

# cleanup the fresh new user
cd "$SERVER_DIR"
node --input-type=module -e "
import 'dotenv/config'
import pg from 'pg'
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
const { rows } = await pool.query(\"SELECT id FROM users WHERE email = 'fresh.new@example.com'\")
for (const r of rows) {
  await pool.query('DELETE FROM cart_items WHERE user_id=\$1',[r.id])
  await pool.query('DELETE FROM wishlist_items WHERE user_id=\$1',[r.id])
  await pool.query('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id=\$1)',[r.id])
  await pool.query('DELETE FROM orders WHERE user_id=\$1',[r.id])
  await pool.query('DELETE FROM addresses WHERE user_id=\$1',[r.id])
  await pool.query('DELETE FROM users WHERE id=\$1',[r.id])
}
console.log('cleaned fresh user:', rows.length)
await pool.end()
" 2>&1 | grep -v -i warning

pkill -f "node index.js" 2>/dev/null
echo DONE
