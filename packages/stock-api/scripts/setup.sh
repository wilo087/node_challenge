#!/bin/sh

# Install dependencies
yarn workspace @stock/api install

# Wait for the dependencies to be available
/opt/bin/wait-for-it.sh stock.postgres:5432 --timeout=0

# Run the process
yarn dev-api
