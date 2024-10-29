---
'@graphcommerce/magento-cart': patch
---

Solve an issue where the cart would be sometimes undefined, but a typescript `Partial` was too general.
