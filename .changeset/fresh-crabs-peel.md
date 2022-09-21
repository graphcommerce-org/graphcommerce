---
'@graphcommerce/magento-graphcms': patch
---

Disable arrayInputCoercion, this makes handling GraphQL array input types easier in the codebase. Although GraphQL accepts both array and a single value and it is following the spec, this makes handing it much easier.
