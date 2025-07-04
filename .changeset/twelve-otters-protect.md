---
'@graphcommerce/magento-category': patch
'@graphcommerce/magento-product': patch
---

Solve issue where in some cases a second ProductList query was made because the category used an `eq` filter instead of an `in` filter.
