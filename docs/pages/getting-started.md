# Getting started

The getting started guide is split into two separate setups:

1. Development setup: improve and continue developing the framework and it's
   examples
2. Project setup: use all the included packages as libraries

## Preparation

Make sure you are using node 12:

- Install node 12: `nvm install 12`
- Make node 12 the default: `nvm alias default node`
- Switch to node 12: `nvm use 12`

## Development setup

1. Clone the repository locally

## Install

Make sure you're using Node >= 12: `nvm install 12 && nvm alias default node`

1. `yarn`
2. `cp .env.example .env`
3. `cp examples/soxbase-api/.env.example examples/soxbase-api/.env`
4. Fill in `GRAPHCMS_BEARER` in `examples/soxbase-api/.env`, in 1Pass under
   `soxbase-api`
5. `cp examples/soxbase/.env.example examples/soxbase/.env`

## Customize endpoint:

Replace MAGENTO_ENDPOINT in `.env` and `examples/soxbase-api/.env` with your own
endpoint.

## Run

`yarn dev` + `yarn stop`

## Local build

- `yarn build`

## Project setup

Not yet supported / todo
