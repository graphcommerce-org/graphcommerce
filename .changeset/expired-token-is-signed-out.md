---
'@graphcommerce/magento-customer': patch
---

A customer token with `valid: false` counts as signed out in `useCustomerSession`, `getPrivateQueryContext` and `usePrivateQueryContext`. `customerLink` does not send that token, so the shop showed guest prices in the layout for a customer and kept customer queries that failed.
