---
menu: 1. Installation
metaTitle: Getting started with GraphCommerce
---

# Getting started with GraphCommerce

In this guide, you will set up a GraphCommerce app locally, allowing you to
start building.

### Requirements

- Lixux, MacOS or WSL2
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

## Step 2: Configure API keys (optional)

Duplicate and rename the configuration example file to:
`graphcommerce.config.js` and configure the following:

- `magentoEndpoint` [?](../framework/config.md#magentoendpoint-string)
- `hygraphEndpoint` [?](../framework/config.md#hygraphendpoint-string)
- `magentoStoreCode` [?](../framework/config.md#magentostorecode-string)

> magentoStoreCode
>
> - The first storeview in your object is loaded by default, with no added
>   suffix to the URL.
> - As the user switches to, e.g., the Canadian storeview, the suffix /en-ca is
>   added to the URL.
> - The locale, e.g., en-ca, is used to load the storeview
>   [translation](../framework/translations.md)
> - A user is auto-redirected to the relevant storeview when their browser
>   language matches the locale
>   (`Admin > Store > Configuration > General > General > Locale`) of that
>   storeview.

### Requirements

- Magento version 2.4.3 or higher - Clean install, a production or a development
  environment
- Hygraph - A project with the required schema.
  [Clone ↗](https://app.hygraph.com/clone/caddaa93cfa9436a9e76ae9c0f34d257?name=GraphCommerce%20Demo)
  the schema as your starting point.

## Step 3: Start the app

```bash
yarn
# Install dependencies (may take a while)
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
> [troubleshooting guide](../framework/troubleshooting.md)

## Next steps

- The [Quick start](../getting-started/readme.md) guide covers about 80% of the
  concepts you'll use, so it's a great place to start.
- [Start customizing](../getting-started/start-building.md) to go from "Hello
  World" to a fully built GraphCommerce custom storefront.
