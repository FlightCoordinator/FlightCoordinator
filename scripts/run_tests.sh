#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/.."

WEB_CLIENT_PATH="$ROOT_DIR/apps/web-client"
AUTH_SERVICE_PATH="$ROOT_DIR/apps/auth-service"
DATA_SERVICE_PATH="$ROOT_DIR/apps/data-service"

echo "Info: Running web client tests..."

cd "$WEB_CLIENT_PATH"
pnpm test

echo "Info: Completed web client tests."
echo "---"
echo "Info: Running auth service tests..."

cd "$AUTH_SERVICE_PATH"
./mvnw test

echo "Info: Completed auth service tests."
echo "---"
echo "Info: Running data service tests..."

cd "$DATA_SERVICE_PATH"
./mvnw test

echo "Info: Completed data service tests."
