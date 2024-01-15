---
'@graphcommerce/magento-product': patch
---

Fixed a bug which caused the default values of the productAddToCartForm to be overwritten if the selected configurable option of a product contained a visible simple product. Before the fix you could not add the same product twice without reloading the page.
