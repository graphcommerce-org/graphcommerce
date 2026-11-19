---
'@graphcommerce/magento-product-configurable': patch
---

Fix the default of `configurableVariantValues` (`{ url: true, content: true }`), which did not apply when `graphcommerce.config.ts` does not set the field. In shops without this field, when a shopper selects a variant on the product page, the URL changes to the URL of the variant and the page shows the name, description, short description and meta data of the variant. To keep the values of the configurable product, set `configurableVariantValues: { url: false, content: false }`.
