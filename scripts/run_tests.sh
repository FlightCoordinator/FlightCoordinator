#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/.."

FRONTEND_PATH="$ROOT_DIR/apps/client"
BACKEND_PATH="$ROOT_DIR/apps/server"
ALGORITHM_PATH="$ROOT_DIR/apps/algorithm"

echo "Info: Running frontend tests..."

cd "$FRONTEND_PATH"
pnpm test

echo "Info: Completed frontend tests."

echo "---"

echo "Info: Running server tests..."

cd "$BACKEND_PATH"
./mvnw test

echo "Info: Completed server tests."

echo "---"

echo "Info: Running logic tests..."

cd "$ALGORITHM_PATH"
# TODO run tests

echo "Info: Completed logic tests."
