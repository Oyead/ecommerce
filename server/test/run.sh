#!/usr/bin/env bash
set -euo pipefail
SERVER_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SERVER_DIR"
mkdir -p logs
LOG="$SERVER_DIR/logs/server.log"

pkill -f "node index.js" 2>/dev/null || true
sleep 1

# start server, redirect all fds, capture output to file
nohup node index.js </dev/null >"$LOG" 2>&1 &
SERVER_PID=$!

# wait for readiness
for i in $(seq 1 30); do
  if curl -s --max-time 2 http://localhost:4000/health >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl -s --max-time 3 http://localhost:4000/health >/dev/null 2>&1; then
  echo "SERVER FAILED TO START"
  cat "$LOG" | grep -v -i warning
  exit 1
fi

EMAIL="persist.test@example.com"
PASS="Password1"
BASE="http://localhost:4000/api"

# clean any prior test user
TOKEN=""
HELPER=/tmp/token.json

signin() {
  curl -s -X POST "$BASE/auth/signin" -H 'Content-Type: application/json' \
    -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" > "$HELPER"
  TOKEN=$(node -e "const j=require('$HELPER');process.stdout.write(j.token||'')")
}

echo "== 1. SIGNUP =="
curl -s -X POST "$BASE/auth/signup" -H 'Content-Type: application/json' \
  -d "{\"name\":\"Persist Test\",\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"phone\":\"01012345678\"}"
echo

echo "== 2. SIGNIN (duplicate should fail 409) =="
curl -s -o /dev/null -w "%{http_code}\n" -X POST "$BASE/auth/signup" -H 'Content-Type: application/json' \
  -d "{\"name\":\"Persist Test\",\"email\":\"$EMAIL\",\"password\":\"$PASS\"}"

signin
echo "TOKEN: ${TOKEN:0:25}..."

# get a real product id
PID=$(curl -s "https://ecommerce.routemisr.com/api/v1/products?limit=1" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).data[0]._id))")
echo "PRODUCT_ID: $PID"

echo "== 3. ADD TO CART =="
curl -s -X POST "$BASE/cart" -H "Content-Type: application/json" -H "token: $TOKEN" -d "{\"productId\":\"$PID\"}"
echo
echo "== 4. GET CART =="
curl -s "$BASE/cart" -H "token: $TOKEN"
echo
echo "== 5. ADD WISHLIST =="
curl -s -X POST "$BASE/wishlist" -H "Content-Type: application/json" -H "token: $TOKEN" -d "{\"productId\":\"$PID\"}"
echo
echo "== 6. CREATE ORDER =="
curl -s -X POST "$BASE/orders" -H "Content-Type: application/json" -H "token: $TOKEN" \
  -d '{"shippingAddress":{"name":"Home","details":"12 Main St Apt 3","city":"Cairo","phone":"01012345678"},"paymentMethod":"card"}'
echo
echo "== 7. GET ORDERS =="
curl -s "$BASE/orders" -H "token: $TOKEN"
echo
echo "== 8. CART AFTER ORDER (expect empty) =="
curl -s "$BASE/cart" -H "token: $TOKEN"

echo
echo "== now STOP server and restart to prove persistence =="
kill "$SERVER_PID" 2>/dev/null || true
sleep 2

nohup node index.js </dev/null >logs/server.log 2>&1 &
SERVER_PID=$!
for i in $(seq 1 30); do
  curl -s --max-time 2 http://localhost:4000/health >/dev/null 2>&1 && break
  sleep 1
done

signin
echo "== 9. PERSISTENCE after restart: orders =="
curl -s "$BASE/orders" -H "token: $TOKEN"
echo
echo "== 10. PERSISTENCE after restart: wishlist =="
curl -s "$BASE/wishlist" -H "token: $TOKEN"

echo
echo "ALL TESTS DONE"
kill "$SERVER_PID" 2>/dev/null || true
exit 0
