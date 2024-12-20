# likemind

![Node.js CI](https://github.com/slyduda/likemind/actions/workflows/main.yml/badge.svg)

likemind is an open source app that aims to keep track of various companies and brands in an effort to associate relevant activities that they engage in.

## Requirements

- Node 18+
- Docker

## Setup

Setup your `.env` file with the necessary config:

```bash
DATABASE_URL=postgres://default:password@localhost:5432/likemind_db
JWT_SECRET=secret
OPENAI_SECRET=secret
SUPABASE_URL=https://example.supabase.co
SUPABASE_KEY=public
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

Single terminal development will be enabled once installs are more stable. Soon!!

## Acknowledgements

Special thanks to my sweet little babies for making my world so much brighter: Bobo, Noah, Yue, and Zym! <3
