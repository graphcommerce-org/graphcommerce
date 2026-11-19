---
'@graphcommerce/magento-product': patch
'@graphcommerce/next-ui': patch
---

Fix the product list pagination scrolling to the products before the next page was loaded. The shopper saw the products of the previous page until the new products arrived. The pagination loads the products first and then scrolls, the same as the filters.
