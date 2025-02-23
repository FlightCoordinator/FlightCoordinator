#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/.."

WEB_CLIENT_PATH="$ROOT_DIR/apps/web-client"
AUTH_SERVICE_PATH="$ROOT_DIR/apps/auth-service"
DATA_SERVICE_PATH="$ROOT_DIR/apps/data-service"
ALGORITHM_SERVICE_PATH="$ROOT_DIR/apps/algorithm-service"

pnpm concurrently -k \
  -n "frontend,server" \
  -c "bgBlue.bold,bgGreen.bold" \
  "cd $WEB_CLIENT_PATH && pnpm dev" \
  "cd $AUTH_SERVICE_PATH && ./mvnw spring-boot:run" \
  "cd $DATA_SERVICE_PATH && ./mvnw spring-boot:run" # \
# "cd $ALGORITHM_SERVICE_PATH && uvicorn main:app --host 0.0.0.0 --port 8000"
