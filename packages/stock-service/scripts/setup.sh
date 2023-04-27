#!/bin/sh

# Install dependencies
yarn workspace @stock/service install

# Wait for the dependencies to be available
/opt/bin/wait-for-it.sh stock.postgres:5432 --timeout=0

# Wait for the dependencies to be available
/opt/bin/wait-for-it.sh stock.api:3001 --timeout=0

# Generate the prisma types
yarn generate

# Run migrations
yarn migrate

# Run the process
yarn dev-service
