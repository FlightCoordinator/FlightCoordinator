#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/.."

WEB_CLIENT_PATH="$ROOT_DIR/apps/web-client"
AUTH_SERVICE_PATH="$ROOT_DIR/apps/auth-service"
DATA_SERVICE_PATH="$ROOT_DIR/apps/data-service"

pnpm concurrently -k \
  -n "web_client,auth_service,data_service" \
  -c "bgBlue.bold,bgRed.bold,bgGreen.bold" \
  "cd $WEB_CLIENT_PATH && pnpm dev" \
  "cd $AUTH_SERVICE_PATH && ./mvnw spring-boot:run" \
  "cd $DATA_SERVICE_PATH && ./mvnw spring-boot:run" 
