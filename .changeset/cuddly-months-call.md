---
'@graphcommerce/magento-cart': patch
---

When running a cart mutation and the cartId is already passed to the form we use that value instead of retrieving the current cart again.
