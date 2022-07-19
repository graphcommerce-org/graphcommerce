---
'@graphcommerce/magento-cart': minor
'@graphcommerce/magento-customer': minor
---

Added a `{ hydrate: boolean }` option to `useCartQuery`, `useCurrentCartId`, `useCustomerQuery` and `useCustomerSession` to allow for data during the hydration phase. This can cause hydration warnings, but prevents an additional rerender.
