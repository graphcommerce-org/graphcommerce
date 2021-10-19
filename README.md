# GraphCommerce

- [Creating a new project](docs/pages/getting-started/new-project.md)
- [Setting up an existing project](docs/pages/getting-started/existing-project.md)
- [GraphCommerce development setup](docs/pages/getting-started/development-setup.md)

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

## Commits

Commits should follow conventional commit standard for changes to pop up in the
release notes.

## Deploy

- To deploy a testbranch, create a new branch and it will automatically be
  pushed.
- To deploy a release, push commits to master.

## Upgrading dependencies

`yarn upgrade-interactive --latest`
