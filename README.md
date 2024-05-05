# likemind

![Node.js CI](https://github.com/slyduda/likemind/actions/workflows/main.yml/badge.svg)

likemind is an open source app that aims to keep track of various companies and brands in an effort to associate relevant activities that they engage in.

## Requirements

- Node 18+
- Docker

## Setup

Setup your `.env` file with the necessary config:

```bash
POSTGRES_URL=postgres://default:password@localhost:5432/likemind_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=default
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=likemind_db
JWT_SECRET=secret
```

Install the dependencies:

```bash
yarn install
```

Create the docker image:

```bash
docker compose up
```

## Development Server

Start the database on `http://localhost:5432` and the development server on `http://localhost:3000` in two separate terminals:

```bash
docker compose up
yarn dev
```

Single terminal development will be enabled once installs are more stable.

## Acknowledgements

Special thanks to my sweet little babies for making my world so much brighter: Bobo, Noah, Yue, and Zym! <3
