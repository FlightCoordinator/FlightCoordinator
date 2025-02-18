#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/.."

FRONTEND_PATH="$ROOT_DIR/apps/client_dev"
BACKEND_PATH="$ROOT_DIR/apps/server"
ALGORITHM_PATH="$ROOT_DIR/apps/algorithm"

pnpm concurrently -k \
  -n "frontend,server" \
  -c "bgBlue.bold,bgGreen.bold" \
  "cd $FRONTEND_PATH && pnpm dev" \
  "cd $BACKEND_PATH && ./mvnw spring-boot:run" # \
# "cd $ALGORITHM_PATH && uvicorn main:app --host 0.0.0.0 --port 8000"
