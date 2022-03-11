<p align="center">
    <a href="https://www.graphcommerce.org/"><img src="./public/favicon.svg" alt="GraphCommerce Logo"/></a>
</p>
<p align="center">
  <a aria-label="License" href="https://www.npmjs.com/package/@graphcommerce/magento-graphcms">
    <img alt="" src="https://img.shields.io/npm/v/@graphcommerce/magento-graphcms?style=for-the-badge">
  </a>
  <a aria-label="License" href="https://github.com/ho-nl/m2-pwa/blob/master/LICENSE.md">
    <img alt="" src="https://img.shields.io/badge/License-ELv2-green?style=for-the-badge">
  </a>
</p>

<div align="center">

📚 [Docs](https://graphcommerce.org/docs) | 🗣
[Slack](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
| 📝 [Changelog](./CHANGELOG.md)

</div>

GraphCommerce is an open source front-end framework for building headless
Magento e-commerce storefronts in React.

Take a look at the GraphCommerce [demo store](https://graphcommerce.vercel.app/)
or set up your local development environment with the instructions below.

---

# Getting Started

### Download the example

1. `git clone ... graphcommerce`
2. `mkdir my-project`
3. `cp -R graphcommerce/examples/magento-graphcms/. my-project`
4. `rm -rf graphcommerce`
5. `cd my-project`
6. `cp -R .env.example .env`
7. `rm CHANGELOG.md && touch CHANGELOG.md`
8. `rm -rf node_modules && rm -rf .next`

Edit /package.json. Delete `"scripts": {...}` and rename `scripts_local` to
`scripts`:

```json
{
  "name": "@my-company/my-project",
  "scripts": {
    ...
  }
}
```

## Start the development environment

- `yarn` Install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

Visit the development environment running at http://localhost:3000  
Visit the GraphQL Playground running at http://localhost:3000/api/graphql

---

## Next steps

- Learn about the general concepts and file structure of the
  [magento-graphcms example](https://github.com/ho-nl/m2-pwa/blob/master/docs/getting-started/readme.md)
- Learn more about
  [getting started with GraphCommerce](https://github.com/ho-nl/m2-pwa/blob/master/docs/getting-started/create.md)
