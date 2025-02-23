#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$SCRIPT_DIR/../.."

WEB_CLIENT_PATH="$ROOT_DIR/apps/web-client"
AUTH_SERVICE_PATH="$ROOT_DIR/apps/auth-service"
DATA_SERVICE_PATH="$ROOT_DIR/apps/data-service"
ALGORITHM_SERVICE_PATH="$ROOT_DIR/apps/algorithm-service"

DATA_DB_NAME="dc_data_db"
AUTH_DB_NAME="fc_auth_db"
DB_USER="local_user"
DB_PASSWORD="local_password"
POSTGRES_VERSION="14"
PG_HBA_FILE="/etc/postgresql/$POSTGRES_VERSION/main/pg_hba.conf"

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

# POSTGRESQL
echo "Info: Starting PostgreSQL setup..."

start_postgres() {
  echo "Info: Starting PostgreSQL service..."
  sudo service postgresql start
  echo "Info: Successfully started PostgreSQL service."
}

setup_database() {
  echo "Info: Setting up PostgreSQL database, user, and privilages..."

  sudo -u postgres psql <<EOSQL
  CREATE DATABASE ${AUTH_DB_NAME};
  CREATE USER ${DB_USER} WITH PASSWORD '${DB_USER}';
  GRANT ALL PRIVILEGES ON DATABASE ${AUTH_DB_NAME} TO ${DB_USER};
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${DB_USER};
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${DB_USER};
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${DB_USER};
  ALTER USER ${DB_USER} WITH SUPERUSER;
  ALTER ROLE ${DB_USER} CREATEDB;
EOSQL

  sudo -u postgres psql <<EOSQL
  CREATE DATABASE ${DATA_DB_NAME};
  CREATE USER ${DB_USER} WITH PASSWORD '${DB_USER}';
  GRANT ALL PRIVILEGES ON DATABASE ${DATA_DB_NAME} TO ${DB_USER};
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${DB_USER};
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${DB_USER};
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${DB_USER};
  ALTER USER ${DB_USER} WITH SUPERUSER;
  ALTER ROLE ${DB_USER} CREATEDB;
EOSQL

  echo "Info: Successfully set up PostgreSQL database, user, and privilages."
}

check_user_roles() {
  echo "Info: Checking PostgreSQL roles..."
  sudo -u $DB_USER psql -c "\du"
  echo "Info: Successfully checked PostgreSQL roles."
}

update_pg_hba() {
  echo "Info: Updating pg_hba.conf..."
  sudo sed -i '/^local[[:space:]]\+all[[:space:]]\+all[[:space:]]\+peer$/s/peer/md5/' "$PG_HBA_FILE" # TODO test this line
  echo "Info: Successfully updated pg_hba.conf..."
}

restart_postgres() {
  echo "Info: Restarting PostgreSQL service..."
  sudo systemctl restart postgresql
  echo "Info: Successfully PostgreSQL service."
}

test_connection() {
  echo "Info: Testing database connection..."
  psql -U ${DB_USER} -d ${DATA_DB_NAME} -d "\dt"
    psql -U ${DB_USER} -d ${AUTH_DB_NAME} -d "\dt"
  echo "Info: Successfully tested database connection."
}

start_postgres
setup_database
check_user_roles
update_pg_hba
restart_postgres
test_connection

echo "Info: Successfully completed PostgreSQL setup."

exit 0
