---
menu: Create a custom storefront
---

# Create a GraphCommerce storefront

You're ready to create a GraphCommerce storefront. You want to set up your
development environment so that you can begin development.

In this tutorial, you'll create a GraphCommerce app locally to begin developing
a full featured storefront. GraphCommerce is a front-end framework used for
building headless Magento e-commerce PWA's.

## What you'll learn

After you've finished this tutorial, you'll have accomplished the following:

- Set up your local development environment
- Generated a new project based on the magento-graphcms example

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/fk82kF" />
 <figcaption>GraphCommerce magento-graphcms example category page</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/Fs7XWK" />
 <figcaption>GraphCommerce magento-graphcms example product page</figcaption>
</figure>

## Requirements

You've familiarized yourself with
[React ↗](https://reactjs.org/docs/getting-started.html),
[Next.js ↗](https://nextjs.org/docs/getting-started), and
[Mui ↗](https://mui.com/getting-started/installation/). GraphCommerce is a
frontend React framework that uses Next.js for server-side rendering.

## Install dependencies

If you want to test a GraphCommerce storefront using a pre-configured Magento
demo store and a pre-configured GraphCMS project with demo content, then you
need to only install the dependencies. This is the quickest approach.

- Install and use node 14: `nvm install 14 && nvm use 14`
- Install yarn: `npm install --global yarn`

# Step 1: Create a new GraphCommerce app

### Download the example

- `git clone https://github.com/ho-nl/m2-pwa graphcommerce`
- `mkdir my-project`
- `cp -R graphcommerce/examples/magento-graphcms/. my-project`
- `cd my-project`
- `cp -R .env.example .env`
- `rm CHANGELOG.md && touch CHANGELOG.md`
- `rm -rf node_modules && rm -rf .next`

### Update package.json

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

# Step 2: Magento and GraphCMS API keys

> By default, the .env file is configured with API keys from a demo Magento
> store and a demo GraphCMS project. If you want to test your GraphCommerce app
> using the demo store, then you can start the development environment. Only
> proceed with the following steps if you want to develop a GraphCommerce
> storefront using your own Magento store and/or GraphCMS project.

### Requirements

To order to be able to connect your GraphCommerce app to your Magento backend
and/or GraphCMS project, you'll need:

- Magento 2.4.3 - Clean install, or a production or development environment
- GraphCMS - A GraphCMS project with the required schema.
  [Clone the demo GraphCMS project](https://app.graphcms.com/clone/caddaa93cfa9436a9e76ae9c0F34d257)
  as your starting point.

### Configuration

To connect your GraphCommerce app to your Magento backend and/or GraphCMS
project, you need to update variables in the /.env file. The .env file contains
useful information about your storefront.

`MAGENTO_ENDPOINT=""`  
Magento 2 API url, located at `http://<magento2-server>/graphql`.

`IMAGE_DOMAINS=",media.graphcms.com"`  
Comma separated list of image domains. Add media.graphcms.com as default.

`GRAPHCMS_URL=""`  
GraphCMS API url. Once logged in, copy it from Project Settings > Api Access >
Content API

`NEXT_PUBLIC_LOCALE_STORES='{"en": "en_US", "nl": "default"}'`  
List of routes and store_codes. In above example, adding url suffix /nl/ would
result in the storeview 'default' being loaded. GraphCommerce uses the browser
language to determine which storeview to load. A url suffix will be added as a
result, with the exception of the first option in the list.

> If need to fetch a list of availble store_codes, run `yarn dev` when you
> entered your `MAGENTO_ENDPOINT`. The app won't build, but the GraphQL explorer
> will start at `http://localhost:3000/api/graphql`. Enter the following query:
>
> ```graphql {3-4}
> query {
>   availableStores {
>     store_code
>     store_name
>   }
> }
> ```

### Remove unused PSP's

The example has Payment Service Providers integrated (Mollie, Braintree). Remove
the ones you don't want to use.

- Remove `"@graphcommerce/[psp]"` from package.json
- Remove all [psp] references from `pages/checkout/payment.tsx`

# Step 3: Start the development environment

- `yarn` Install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

Visit the development environment running at http://localhost:3000  
Visit the GraphQL Playground running at http://localhost:3000/api/graphql

> No success? Refer to [common build errors](../framework/troubleshooting.md)

# Next steps

- Learn how to [Set up Visual Studio Code](../getting-started/vscode.md) and
  install usefull extensions for an optimal development experience
- [Start building a GraphCommerce custom storefront](../getting-started/start-building.md)
  by customizing text and component styles, fetching data from server
  components, and making changes to GraphQL queries.
