# GraphCommerce

Stack:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [GraphQL](https://graphql.org/) +
  [GraphQL Code Generator](https://graphql-code-generator.com/) +
  [Apollo](https://www.apollographql.com/docs/react/)
- [GraphQL Mesh](https://graphql-mesh.com/)
- [Material UI](https://material-ui.com/)
- [Framer motion](https://www.framer.com/motion/)

Backends:

- [GraphCMS](https://graphcms.com/)
- [Magento 2](https://github.com/magento/magento2)

Hosting:

- [Vercel](https://vercel.com/reachdigital)

## Install

1. Make sure you are using node 14. (`nvm install 14 && nvm use 14`)
2. `git clone git@github.com:ho-nl/m2-pwa.git && cd m2-pwa`
3. `npm install --global yarn` (If you don't have Yarn installed yet)
4. `yarn install`
5. `cp examples/magento-graphcms-api/.env.example examples/magento-graphcms-api/.env`
6. `cp examples/magento-graphcms/.env.example examples/magento-graphcms/.env`
7. Fill in `GRAPHCMS_BEARER` in `examples/magento-graphcms-api/.env`, in 1Pass
   under `magento-graphcms-api`
8. `yarn workspace @graphcommerce/magento-graphcms-api build:mesh && yarn dev:api && yarn workspace @graphcommerce/magento-graphcms codegen; yarn stop`

## Customize endpoint (optional):

Replace MAGENTO_ENDPOINT in `.env` and `examples/magento-graphcms-api/.env` with
your own endpoint.

## Commands

- `yarn dev`: Start development server
  - frontend: http://localhost:3000
  - graphql playground: http://localhost:3001/api/graphql
- `yarn stop`: Stop development server
- `yarn build`: Create production build of everything
- `yarn tsc:lint`: Lint the installation with TypeScript

## Commits

Commits should follow conventional commit standard for changes to pop up in the
release notes.

## Deploy

- To deploy a testbranch, create a new branch and it will automatically be
  pushed.
- To deploy a release, push commits to master.

## Upgrading dependencies

`yarn upgrade-interactive --latest`
