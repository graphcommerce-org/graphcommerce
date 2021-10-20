## Development setup

This Development Setup guide is to develop the GraphCommerce project it's self.
If you are looking to use GraphCommerce, take a look at the
[Getting Stared guide](./development-setup.md)

## Installation

- Make sure you are using node 14: `nvm install 14 && nvm use 14`
- Make sure you have installed yarn: `npm install --global yarn`

1. `git@github.com:ho-nl/m2-pwa.git graphcommerce && cd graphcommerce`
2. `yarn install`
3. `cp examples/magento-graphcms/.env.example examples/magento-graphcms/.env`
4. `yarn dev` http://localhost:3000/api/graphql should show the GraphQL
   Playground
5. `yarn workspace @graphcommerce/magento-graphcms codegen` Should work without
   any errors.

Project is successfully setup, you can now start with `yarn dev`

## Commands

- `yarn dev:log`: Information about running processes
- `yarn dev`: Start development server
  - frontend: http://localhost:3000
  - graphql playground: http://localhost:3000/api/graphql
- `yarn stop`: Stop development server
- `yarn build`: Create production build of everything
- `yarn tsc:lint`: Lint the installation with TypeScript

## Customize endpoint:

Replace MAGENTO_ENDPOINT in `.env` and `examples/magento-graphcms/.env` with
your own endpoint.

## Run

`yarn dev` + `yarn stop`

## Local build

- `yarn build`
