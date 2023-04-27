# Node.js Challenge

## Requirements
```sh
$ docker -v
# Docker version 20.10.24, build 297e128
```

## Getting started
Setup the environment
```sh
$ cp .env.example .env
```

Run the services
```sh
$ docker compose up

# if you want to run in background
$ docker compose up -d
```
You endpoint should be available at `http://localhost:3000`

## Running tests
```sh
$ node -v
# v18.16.0

$ yarn install && yarn test
```

### API Documentation

### /register - POST
```sh
# role: user
curl --location 'http://localhost:3000/register' --header 'Content-Type: application/json' \
--data-raw '{
  "email": "user@jobsity.com",
  "role": "user"
}'

# role: admin
curl --location 'http://localhost:3000/register' --header 'Content-Type: application/json' \
--data-raw '{
  "email": "admin@jobsity.com",
  "role": "admin"
}'

# Don't forget to save the password
```

### login - GET
```sh
curl --location 'http://localhost:3000/login' --header 'Content-Type: application/json' \
--data-raw '{
  "email": "user@jobsity.com",
  "password": "<your_password>"
  }'
```

### /stats - GET (role admin)
```sh
curl --location 'http://localhost:3000/stats' --header 'Authorization: Bearer <token>'
```

### /history - GET
```sh
curl --location 'http://localhost:3000/history' --header 'Authorization: Bearer <token>'
```
### /stock/:code - GET
```sh
curl --location 'http://localhost:3000/stock/aapl.us' --header 'Authorization: Bearer <token>'
```