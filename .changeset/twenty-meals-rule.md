---
'@graphcommerce/magento-cart': patch
---

When the cart totals are updated via a mutation, make sure to also fetch the id when the query is used so that automatically updates.
