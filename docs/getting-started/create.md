---
menu: 1. Create a custom storefront
metaTitle: Create a custom storefront
---

# Create a GraphCommerce storefront

You're ready to create a GraphCommerce storefront. You want to set up your
development environment so that you can begin development.

In this tutorial, you'll create a GraphCommerce app locally to begin developing
a full-featured storefront. GraphCommerce is a front-end framework used for
building headless Magento e-commerce PWA's.

### What you'll learn

After you've finished this tutorial, you'll have accomplished the following:

- Set up your local development environment
- Generated a new project based on the magento-graphcms example

<figure>

![GraphCommerce magento-graphcms example category page](https://user-images.githubusercontent.com/1251986/157831693-7ef3a2fb-779c-406e-8dd6-b984135ec58c.png)

 <figcaption>GraphCommerce magento-graphcms example category page</figcaption>
</figure>

<figure>

![GraphCommerce magento-graphcms example product page](https://user-images.githubusercontent.com/1251986/157831746-461cd0cf-8671-4780-bafc-ae853f3f93da.png)

 <figcaption>GraphCommerce magento-graphcms example product page</figcaption>
</figure>

### Requirements

You've familiarized yourself with
[React ↗](https://reactjs.org/docs/getting-started.html),
[Next.js ↗](https://nextjs.org/docs/getting-started), and
[Mui ↗](https://mui.com/getting-started/installation/). GraphCommerce is a
front-end React framework that uses Next.js for server-side rendering.

### Install dependencies

If you want to test a GraphCommerce storefront using a pre-configured Magento
demo store and a pre-configured GraphCMS project with demo content, then you
need to only install the dependencies. This is the quickest approach.

- Install and use node 14: `nvm install 14` or `nvm use 14`
- Install yarn: `npm install --global yarn`

## Step 1: Create a new GraphCommerce app

<figure>

https://user-images.githubusercontent.com/1251986/158647122-dc57002f-a9c2-4661-a0a0-28a868ecf2f8.mp4

<video width="100%" controls autoPlay loop muted playsInline>
<source src="https://user-images.githubusercontent.com/1251986/158647122-dc57002f-a9c2-4661-a0a0-28a868ecf2f8.mp4" type="video/mp4"/>
</video>

  <figcaption>GraphCommerce installation</figcaption>
</figure>

### Download the example

1. `git clone https://github.com/graphcommerce-org/graphcommerce.git` — clone repository
2. `mkdir my-project` — create project folder
3. `cp -R graphcommerce/examples/magento-graphcms/. my-project && rm -rf graphcommerce` — copy example, delete repo
4. `cd my-project` — change directory to project folder
5. `cp -R .env.example .env` — create .env file
6. `rm CHANGELOG.md` — remove changelog

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

## Step 2: Magento and GraphCMS API keys

> By default, the .env file is configured with API keys from a demo Magento
> store and a demo GraphCMS project. If you want to test your GraphCommerce app
> using the demo store, then you can start the development environment. Only
> proceed with the following steps if you want to develop a GraphCommerce
> storefront using your own Magento store and/or GraphCMS project.

### Requirements

To order to be able to connect your GraphCommerce app to your Magento backend
and/or GraphCMS project, you'll need:

- Magento 2.4.3 - Clean install, a production or a development environment
- GraphCMS - A GraphCMS project with the required schema.
  [Clone the demo GraphCMS project ↗](https://app.graphcms.com/clone/caddaa93cfa9436a9e76ae9c0F34d257)
  as your starting point.

### Configuration

To connect your GraphCommerce app to your Magento backend and/or GraphCMS
project, you need to update variables in the /.env file. The .env file contains
useful information about your storefront.

`MAGENTO_ENDPOINT=""`  
Magento 2 API URL, located at `http://<magento2-server>/graphql`.

`IMAGE_DOMAINS=",media.graphcms.com"`  
Comma-separated list of image domains. Add media.graphcms.com as default.

`GRAPHCMS_URL=""`  
GraphCMS API URL. Once logged in, copy it from Project Settings > Api Access >
Content API

`NEXT_PUBLIC_LOCALE_STORES='{"en-us": "default", "en-ca": "canada"}'`  
List of routes and store_codes:

- When the user switches to the Canadian storeview, the suffix /en-ca is added
  to the URL.
- The first storeview in the object is loaded by default. No suffix is added to
  the URL.
- The key (en-ca) is used to load the storeview
  [translation](../framework/translations.md)
- When a users' browser language matches a storeviews' locale
  (`Admin > Store > Configuration > General > General > Locale`), the user is
  automatically redirected to the corresponding storeview.

> If you need to fetch a list of available store_codes, run `yarn dev` when you
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
the ones your Magento backend doesn't support.

- Remove Payment Service integrations from package.json: `@graphcommerce/mollie-magento-payment` and/or `@graphcommerce/magento-payment-braintree`
- Remove Payment Service references from `pages/checkout/payment.tsx`

## Step 3: Start the development environment

- `yarn` Install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

Visit the development environment running at http://localhost:3000  
Visit the GraphQL Playground running at http://localhost:3000/api/graphql

> No success? Refer to [common build errors](../framework/troubleshooting.md) or
> ask your question in the public
> [Slack community ↗](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
> chat

## Next steps

- Learn how to [Set up Visual Studio Code](../getting-started/vscode.md) and
  install usefull extensions for an optimal development experience
- [Start building a GraphCommerce custom storefront](../getting-started/start-building.md)
  by customizing text and component styles, fetching data from server
  components, and making changes to GraphQL queries.
