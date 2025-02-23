#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/.."

WEB_CLIENT_PATH="$ROOT_DIR/apps/web-client"
AUTH_SERVICE_PATH="$ROOT_DIR/apps/auth-service"
DATA_SERVICE_PATH="$ROOT_DIR/apps/data-service"
ALGORITHM_SERVICE_PATH="$ROOT_DIR/apps/algorithm-service"

build_webclient() {
  echo "Info: Building web client..."

  cd "$WEB_CLIENT_PATH"
  pnpm i
  pnpm run build

  if [ $? -eq 0 ]; then
    echo "Info: Successfully built web client."
  else
    echo "Error: Failed to build web client."
    exit 1
  fi
}

build_dauthservice() {
  echo "Info: Building auth service..."

  cd "$AUTH_SERVICE_PATH"
  ./mvnw clean package

  if [ $? -eq 0 ]; then
    echo "Info: Successfully built auth service."
  else
    echo "Error: Failed to build auth service."
    exit 1
  fi
}


build_dataservice() {
  echo "Info: Building data service..."

  cd "$DATA_SERVICE_PATH"
  ./mvnw clean package

  if [ $? -eq 0 ]; then
    echo "Info: Successfully built data service."
  else
    echo "Error: Failed to build data service."
    exit 1
  fi
}

build_algorithmservice() {
  echo "Info: Building algorithm service..."

  cd "$ALGORITHM_PATH"
  # code here

  if [ $? -eq 0 ]; then
    echo "Info: Successfully built algorithm service."
  else
    echo "Error: Failed to build algorithm service."
    exit 1
  fi
}

build_webclient
build_dauthservice
build_dataservice
build_algorithmservice
