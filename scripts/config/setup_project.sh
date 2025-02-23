#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/../.."

WEB_CLIENT_PATH="$ROOT_DIR/apps/web-client"
AUTH_SERVICE_PATH="$ROOT_DIR/apps/auth-service"
DATA_SERVICE_PATH="$ROOT_DIR/apps/data-service"
ALGORITHM_SERVICE_PATH="$ROOT_DIR/apps/algorithm-service"

echo "---"

# WEB CLIENT DEPENDENCIES
echo "Info: Installing web client dependencies..."

cd "$WEB_CLIENT_PATH" || exit 1
pnpm install

echo "Info: Successfully installed web client dependencies."
echo "---"

# AUTH SERVICE SETUP
echo "Info: Setting up auth service dependencies..."

cd "$AUTH_SERVICE_PATH" || exit 1
./mvnw clean install

echo "Info: Successfully set up auth service dependencies."
echo "---"

# DATA SERVICE SETUP
echo "Info: Setting up data service dependencies..."

cd "$DATA_SERVICE_PATH" || exit 1
./mvnw clean install

echo "Info: Successfully set up data service dependencies."
echo "---"

# PYTHON VENV AND DEPENDENCIES
echo "Info: Setting up algorithm service's virtual environment..."

cd "$ALGORITHM_SERVICE_PATH" || exit 1
python3 -m venv .venv
pip install -r requirements.txt

echo "Info: Successfully set algorithm service's virtual environment..."
echo "---"

# ROOT DEPENDENCIES
echo "Info: Installing root dependencies..."

cd "$ROOT_DIR" || exit 1
pnpm install

echo "Info: Successfully installed root dependencies."
echo "---"

exit 0
