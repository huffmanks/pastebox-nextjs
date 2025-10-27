#!/bin/sh
# Wait for DB
until pg_isready -h db -p 5432; do
  echo "Waiting for DB..."
  sleep 1
done

# Run all SQL migrations
for f in /app/db/migrations/*.sql; do
  echo "Applying $f"
  psql "$DATABASE_URL" -f "$f"
done

# Start Next.js server
node server.js
