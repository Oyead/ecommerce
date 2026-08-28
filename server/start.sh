#!/usr/bin/env bash
# Start the API server fully detached so it survives the invoking shell.
cd "$(dirname "$0")"
mkdir -p logs
setsid nohup node index.js </dev/null >logs/server.log 2>&1 &
echo "started PID $!"
