---
'@graphcommerce/magento-cart': patch
---

Solve issue where if the onBeforeSubmit would return false, it would still error if submitted while the cart is locked.
