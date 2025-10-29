#!/bin/sh
set -e

echo "Starting entrypoint script..."

echo "Waiting for PostgreSQL to be ready..."
max_retries=30
retry_count=0

until node -e "
const net = require('net');
const client = new net.Socket();
client.connect(${DATABASE_PORT}, '${DATABASE_HOST}', () => {
  client.destroy();
  process.exit(0);
});
client.on('error', () => {
  process.exit(1);
});
" 2>/dev/null
do
  retry_count=$((retry_count + 1))
  if [ $retry_count -ge $max_retries ]; then
    echo "Failed to connect to PostgreSQL after $max_retries attempts"
    exit 1
  fi
  echo "Waiting for PostgreSQL... attempt $retry_count/$max_retries"
  sleep 2
done

echo "PostgreSQL is ready!"
sleep 2

echo "Running database migrations..."
npx drizzle-kit migrate

echo "Migrations completed successfully"

echo "Starting Next.js application..."
exec "$@"