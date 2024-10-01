# Algolia Magento 2

An implementation of Algolia personalization/Analytics through the GraphQL Mesh.

## Prerequisites

1. Make sure you have configured @graphcommerce/algolia-products.
2. As this is an extension of the google-datalayer. Make sure you have installed
   @graphcommerce/google-datalayer

## Installation

1. Find current version of your `@graphcommerce/next-ui` in your package.json.
2. `yarn add @graphcommerce/algolia-personalization@9.0.0` (replace 9.0.0 with
   the version of the step above)

## Configuration

1. See [Config](./Config.graphqls) for the configuration values. Add the
   following to your graphcommerce.config.js:

   ```js
   const config = {
     algolia: {
       // Even if you do not use personalization, enabling analytics still allows you to track events in Algolia.
       algoliaEnableAnalytics: true,
     },
   }
   ```

2. In your algolia dashboard make sure, you have (ai)-personalization enabled.
3. Continue to browse the site, and make sure your events are logged in de event
   debugger in your algolia dashboard. In the under left corner.
   `Data Sources > Events > Debugger`. Once you've collected several events, you
   can start configuring personalization
4. in `Enchance > personalization` setup the strategies. Note: if you can't find
   some events, make sure you have send several.
