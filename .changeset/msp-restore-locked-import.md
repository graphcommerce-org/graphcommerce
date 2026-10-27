---
'@graphcommerce/magento-payment-multisafepay': patch
---

`MSPRestoreLocked` reads the cart lock with `useCurrentCartId`. It imported `@graphcommerce/magento-cart/hooks/CurrentCartId.gql`, which the `exports` of `magento-cart` do not list, so the build failed.
