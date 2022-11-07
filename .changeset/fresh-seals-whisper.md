---
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/graphcms-ui': minor
'@graphcommerce/graphql': minor
'@graphcommerce/magento-cart': minor
'@graphcommerce/magento-customer': minor
'@graphcommerce/magento-graphql': minor
'@graphcommerce/magento-store': minor
'@graphcommerce/magento-wishlist': minor
---

ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin.
