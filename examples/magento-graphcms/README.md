<p align="center">
    <a href="https://www.graphcommerce.org/"><img src="https://graphcommerce.vercel.app/favicon.svg" alt="GraphCommerce Logo"/></a>
</p>
<p align="center">
  <a aria-label="License" href="https://www.npmjs.com/package/@graphcommerce/magento-graphcms">
    <img alt="" src="https://img.shields.io/npm/v/@graphcommerce/magento-graphcms?style=for-the-badge">
  </a>
  <a aria-label="License" href="https://github.com/graphcommerce-org/graphcommerce/blob/main/LICENSE.md">
    <img alt="" src="https://img.shields.io/badge/License-ELv2-green?style=for-the-badge">
  </a>
  <a aria-label="Vercel logo" href="https://vercel.com?utm_source=graphcommerce&utm_campaign=oss">
    <img src="https://img.shields.io/badge/POWERED%20BY%20Vercel-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000">
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

https://user-images.githubusercontent.com/1251986/158570386-ea831ae4-f6b8-4776-81b3-d7b121afee9f.mp4

---

# Getting Started

### Download the example

1. `git clone -b main --depth 1 https://github.com/graphcommerce-org/graphcommerce.git`
2. `mkdir my-project`
3. `cp -R graphcommerce/examples/magento-graphcms/. my-project`
4. `cd my-project`
5. `rm CHANGELOG.md`
6. `rm -r node_modules && rm -r .next`

## Start the development environment

- `yarn` Install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

Visit the development environment running at http://localhost:3000  
Visit the GraphQL Playground running at http://localhost:3000/api/graphql

## Contributing to GraphCommerce

Learn how to
[contribute to GraphCommerce](https://github.com/graphcommerce-org/graphcommerce/blob/main/docs/contributing.md)

---

## Next steps

- Learn about the general concepts and file structure of the
  [magento-graphcms example](https://github.com/graphcommerce-org/graphcommerce/blob/main/docs/getting-started/readme.md)
- Learn more about
  [getting started with GraphCommerce](https://github.com/graphcommerce-org/graphcommerce/blob/main/docs/getting-started/create.md)
