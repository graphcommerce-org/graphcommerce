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
  <video style="min-width:100%; aspect-ratio: 16:9; box-shadow: 0 10px 60px 0 rgba(0,0,0,0.10); margin: 30px 0" controls>
    <source src="https://cdn-std.droplr.net/files/acc_857465/ZCLvZ7" type="video/mp4">
  Your browser does not support the video tag.
  </video>
 <figcaption>GraphCommerce magento-graphcms example demo</figcaption>
</figure>

## Requirements

You've familiarized yourself with [React ↗](), [Next.js ↗](), and [Mui ↗]().
GraphCommerce is a frontend React framework that uses Next.js for server-side
rendering.

## Install dependencies

If you want to test a GraphCommerce app using a pre-configured Magento demo
store and a pre-configured GraphCMS project with demo content, then you need to
only install the dependencies. This is the quickest approach.

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
`scripts`

Before:

```json
{
  "name": "@graphcommerce/magento-graphcms",
  "scripts": {
    // ... monorepo scripts, start, build, dev, ...
  },
  "scripts_local": {
    // ... start, build, dev, ...
  }
}
```

After

```json
{
  "name": "@my-company/my-project",
  "scripts": {
    // ... start, build, dev, ...
  }
}
```

# Step 2: Modify API credentials and dependencies

> By default, the .env file is connected to a demo Magento store and a GraphCMS
> project. It uses demo api keys. If you want to test your GraphCommerce app
> using the demo store, then you can start the development environment. Only
> proceed with the following steps if you want to develop a GraphCommerce app
> using your own Magento store and/or GraphCMS project.

### Requirements

To order to be able to connect your GraphCommerce app to your Magento backend
and/or GraphCMS project, you'll need:

- Magento 2.4.3 - Clean install, or a production or development environment
- GraphCMS - A GraphCMS project with the required schema.
  [Clone demo GraphCMS project]() as your starting point.

### Configuration

To connect your GraphCommerce app to your Magento backend and/or GraphCMS
project, you need to update variables in the /.env file. The .env file contains
useful information about your storefront.

`MAGENTO_ENDPOINT=""`  
Magento 2 API url, located at http://<magento2-server>/graphql.

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

`NEXT_PUBLIC_SITE_URL`  
Used in /public/sitemap.xml

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
Visit the GraphQL Playground running http://localhost:3000/api/graphql

> No success? Take a look at [common build errors]()

# Next steps

- [Start building a GraphCommerce custom storefront]() by customizing text and
  component styles, fetching data from server components, and making changes to
  GraphQL queries.
