<p align="center">
    <a href="https://www.graphcommerce.org/"><img src="https://graphcommerce.vercel.app/favicon.svg" alt="GraphCommerce Logo"/></a>
</p>

<div align="center">

📚 [Docs](https://graphcommerce.org/docs) | 🗣
[Slack](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
| 📝
[Release notes](https://github.com/graphcommerce-org/graphcommerce/releases)

</div>

GraphCommerce is a framework for building headless ecommerce storefronts in
React and Next.js. It provides a best-in-class example, including components and
utilities, to deliver a high-performance, high-quality ecommerce Progressive Web
App (PWA).

### GraphCommerce Demo's:

- [GraphCommerce Demo: Magento 2.4.7 + Hygraph + Contained sidebar layout + Algolia](https://demo.graphcommerce.org/men/photography)
  ([canary branch](https://demo-canary.graphcommerce.org/men/photography))
- [GraphCommerce Demo: Magento 2.4.6 + Hygraph + Full width layout](https://graphcommerce.vercel.app/men/photography)
- [GraphCommerce Demo: Magento 2.4.7 + No CMS](https://graphcommerce-os.vercel.app/)

### GraphCommerce Pro

GraphCommerce Pro is the paid verison of GraphCommerce, default Open Source
license is €1000 per year, please contact us for a license. For Adobe Commerce
its €2500 per year. Multi year bundles available.

- [GraphCommerce Pro Demo: Magento 2.4.7 + ](https://graphcommerce-pro-os-git-canary-reachdigital.vercel.app/men/photography)
- [GraphCommerce Pro Demo: Adobe Commerce 2.4.7 + Pagebuilder + Returns, Store Credits, Gift Cards, Reward Points](https://graphcommerce-pro-ac-git-canary-reachdigital.vercel.app/page/test-page)

Please note that Pagebuilder is also available for Magento Open Source, just not
available in the Open Source demo.

Explore the [GraphCommerce demo](https://graphcommerce.vercel.app/) or start
building your custom GraphCommerce ecommerce frontend.

https://user-images.githubusercontent.com/1251986/226889542-ec403549-5e4f-4ff6-8fc5-ba879798353f.mp4

The GraphCommerce homepage, showcasing content from both Magento and Hygraph
through a variety of included UX components.

---

# Getting started with GraphCommerce

In this guide, you will set up a GraphCommerce app locally, allowing you to
start building.

### Requirements

- Install and use node 16/18: `nvm install 16` or `nvm use 16`
- Install yarn: `corepack enable`

## Step 1: Create a GraphCommerce app

```bash
git clone -b main --depth 1 https://github.com/graphcommerce-org/graphcommerce.git
# Clone repository
```

```bash
mkdir my-project
# Create project folder
```

```bash
cp -R graphcommerce/examples/magento-graphcms/. my-project && rm -rf graphcommerce && cd my-project
# Copy example, delete repo, navigate to project folder
```

## Step 2: Configure API keys

(Optional,
[continue reading](https://www.graphcommerce.org/docs/getting-started/create))

## Step 3: Start the app

```bash
yarn
# Install the dependencies
```

```bash
yarn codegen
# Converts all .graphql files to typescript files
```

```bash
yarn dev
# Run the app
```

---

🎉 Explore your GraphCommerce app running at http://localhost:3000

(Explore the GraphQL Playground running at http://localhost:3000/api/graphql)

> No success? Consult the
> [troubleshooting guide](../../docs/framework/troubleshooting.md)

## Next steps

- The [Quick start](../../docs/getting-started/readme.md) guide covers about 80%
  of the concepts you'll use, so it's a great place to start.
- [Start customizing](../../docs/getting-started/start-building.md) to go from
  "Hello World" to a fully built GraphCommerce custom storefront.

<p align="center">
  <a aria-label="License" href="https://github.com/graphcommerce-org/graphcommerce/blob/main/LICENSE.md">
    <img alt="" src="https://img.shields.io/badge/License-ELv2-green?style=for-the-badge">
  </a>
  <a aria-label="Vercel logo" href="https://vercel.com?utm_source=graphcommerce&utm_campaign=oss">
    <img src="https://img.shields.io/badge/POWERED%20BY%20Vercel-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000">
  </a>
</p>
