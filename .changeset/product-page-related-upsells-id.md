---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/magento-open-source': patch
'@graphcommerce/magento-storyblok': patch
---

`relatedUpsells` in `ProductPage2` requests the `id` of the product. `products` and `relatedUpsells` write to one cache field, and without `id` in both, the cache lost the related products and the reviews.
