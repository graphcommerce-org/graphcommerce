---
'@graphcommerce/magento-open-source': patch
'@graphcommerce/magento-storyblok': patch
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/graphql': patch
---

Make GraphCommerce compatible with Apollo Client 4.2+ by augmenting Apollo's `DefaultOptions` type with the `preview` extension and the SSR clients' `errorPolicy: 'all'` default.
