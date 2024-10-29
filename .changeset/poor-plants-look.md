---
'@graphcommerce/magento-product': patch
'@graphcommerce/magento-search': patch
---

Move to `attributesList` to get a list of filterable attributes instead of using an introspection query. `productFiltersProSectionRenderer` and `productFiltersProChipRenderer` keys now use `AttributeFrontendInputEnum`.
