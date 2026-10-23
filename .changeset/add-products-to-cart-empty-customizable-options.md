---
'@graphcommerce/magento-product': patch
---

Fix the add-to-cart success message counting 0 when the added cart item has no `customizable_options` to match the requested entered/selected options against. `findAddedItems` now falls back to the SKU (+ configurable variant) match instead of dropping the item.
