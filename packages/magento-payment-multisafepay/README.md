# MultiSafePay

## Requirements

- [MultiSafePay Magento Module](https://github.com/MultiSafepay/magento2)
- [MultiSafePay Magento GraphQL Module](https://github.com/MultiSafepay/magento2-graphql)

## Installation

1. Identify the current version of `@graphcommerce/magento-cart-payment-method`
   in your `package.json`.
2. Install the MultiSafePay module by running:
   ```bash
   yarn add @graphcommerce/magento-payment-multisafepay@<version>
   ```
   Replace `<version>` with the version found in step 1.
3. Run `yarn lingui` at the root of your project to add new translations.
4. Configure settings in Magento:
   - Navigate to: **Sales** -> **MultiSafePay** -> **General Settings** ->
     **Advanced Settings** (these settings should be configured per store view):
     - **_Use custom return URLs for PWA storefront integration_**: Yes
     - **_Custom redirect URL after cancelling the payment_**:
       ```
       https://$domain/$locale/checkout/payment?locked=1&success=0&cart_id={{quote.masked_id}}&method={{payment.code}}&order_number={{order.increment_id}}
       ```
     - **_Custom "Success page" URL_**:
       ```
       https://$domain/$locale/checkout/payment?locked=1&success=1&cart_id={{quote.masked_id}}&method={{payment.code}}&order_number={{order.increment_id}}
       ```
5. Add the `magentoBaseUrl` configuration to `graphql/Config.graphqls`:
   ```graphql
   extend input GraphCommerceConfig {
     """
     @private
     Base URL for Magento installation
     """
     magentoBaseUrl: String!
   }
   ```
6. Update `next.config.js` to handle rewrites for the Return-URL:

   ```js
   const { loadConfig } = require('@graphcommerce/next-config')

   const config = loadConfig()
   const baseUrl = config.magentoEndpoint.replace('/graphql', '') // result: 'https://magento-prod.domain.nl'

   const nextConfig = {
     async rewrites() {
       return [
         {
           source: '/multisafepay/connect/:slug*',
           destination: `${baseUrl}/multisafepay/connect/:slug*`,
         },
       ]
     },
   }
   ```
