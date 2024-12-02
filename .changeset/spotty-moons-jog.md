---
'@graphcommerce/magento-product-configurable': patch
---

Respect configurableVariantValues.gallery config when selecting a configurable variant. The image should only change to the simple product image when the config is set to true, otherwise the configurable image should remain. To keep this functionality, please set `configurableVariantValues: { gallery: true }` in your graphcommerce.config.js
