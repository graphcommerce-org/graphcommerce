---
'@graphcommerce/magento-product': patch
---

The ProductFilters and ProductList queries would only run after the hygraphPageContent query would be resolved, although they don't depend on each other, now they run in parallel.
