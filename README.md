# Reach Digital

Stack:

- [Next.js](https://nextjs.org/) + [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/) +
  [GraphQL Code Generator](https://graphql-code-generator.com/) +
  [Apollo](https://www.apollographql.com/docs/react/)
- [GraphQL Mesh](https://graphql-mesh.com/)
- [Material UI](https://material-ui.com/)
- [Framer motion](https://www.framer.com/motion/)
- [react-schemaorg](https://github.com/google/react-schemaorg) +
  [schema-dts](https://github.com/google/schema-dts)

Backends:

- [GraphCMS](https://graphcms.com/)
- [Magento 2](https://github.com/magento/magento2)

Hosting:

- [Vercel](https://vercel.com/reachdigital)

## Install

Make sure you're using Node >= 12: `nvm install 12 && nvm alias default node`

1. `yarn`
2. `cp .env.example .env`
3. `cp examples/soxbase-api/.env.example examples/soxbase-api/.env`
4. Fill in `GRAPHCMS_BEARER` in `examples/soxbase-api/.env`, in 1Pass under
   `soxbase-api`
5. `cp examples/soxbase/.env.example examples/soxbase/.env`
6. ```
   yarn workspace @reachdigital/graphql-codegen-near-operation-file build
   yarn workspace @reachdigital/graphql-codegen-relay-optimizer-plugin build
   ```

## Customize endpoint:

Replace MAGENTO_ENDPOINT in `.env` and `examples/soxbase-api/.env` with your own
endpoint.

## Run

`yarn dev` + `yarn stop`

## Local build

- `yarn build`

## Commits

Commits are validated with https://github.com/conventional-changelog/commitlint

Gittower: Gittower doesn't properly read your PATH variable and thus commit
validation doesn't work. Use `gittower .` to open this repo.

## Releases

Using https://semantic-release.gitbook.io/.

- Dry-run `GH_TOKEN="bla" SLACK_WEBHOOK="bla" yarn semantic-release`

## Deploy

- To deploy a testbranch, create a new branch and it will automatically be
  pushed.
- To deploy a release, push commits to master.
