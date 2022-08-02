---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/next-ui': minor
---

Solve issue where the products query would return multiple products while requesting a single url_key. Filter the result by findByTypename which finds the correct `typename` but also narrows the typescript type.
