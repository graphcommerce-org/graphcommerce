---
'@graphcommerce/magento-cart': patch
---

The `onBeforeSubmit` of a `useFormGqlMutationCart` form receives the cart id, so the Mollie return URL contains the cart id of the order.
