---
'@graphcommerce/next-config': major
'@graphcommerce/graphql-codegen-markdown-docs': patch
'@graphcommerce/address-autocomplete': patch
'@graphcommerce/algolia-products': patch
'@graphcommerce/algolia-search': patch
'@graphcommerce/demo-magento-graphcommerce': patch
'@graphcommerce/ecommerce-ui': patch
'@graphcommerce/google-datalayer': patch
'@graphcommerce/googleanalytics': patch
'@graphcommerce/googlerecaptcha': patch
'@graphcommerce/googletagmanager': patch
'@graphcommerce/hygraph-ui': patch
'@graphcommerce/lingui-next': patch
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-cart-shipping-address': patch
'@graphcommerce/magento-compare': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-graphql': patch
'@graphcommerce/magento-payment-braintree': patch
'@graphcommerce/magento-product': patch
'@graphcommerce/magento-product-configurable': patch
'@graphcommerce/magento-recently-viewed-products': patch
'@graphcommerce/magento-wishlist': patch
'@graphcommerce/next-ui': patch
'@graphcommerce/storyblok-ui': patch
---

**Breaking change:** configuration fields are server-only, unless their definition in `Config.graphqls` has `@public`. In the browser, `@graphcommerce/next-config/config` resolves to a file with only the `@public` fields, so secrets such as `previewSecret` and `hygraphSecret` stay out of the client JavaScript and its source maps. Turbopack stops the build on a browser import of a server-only field. See [docs/upgrading/graphcommerce-10-to-11.md](docs/upgrading/graphcommerce-10-to-11.md).
