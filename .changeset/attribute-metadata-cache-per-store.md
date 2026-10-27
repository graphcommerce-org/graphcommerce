---
'@graphcommerce/magento-graphql': patch
---

The cache of `customAttributeMetadataV2` has one entry per store. The key had no store, so all stores got the labels of the store that requested the attribute first.
