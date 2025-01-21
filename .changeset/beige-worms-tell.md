---
'@graphcommerce/magento-product-configurable': patch
---

Solve issue where the GetConfigurableOptionsSelection query would be executed even if the product wasn't a ConfigurableProduct.
