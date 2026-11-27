---
'@graphcommerce/image': minor
'@graphcommerce/next-config': patch
'@graphcommerce/magento-cart-items': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-product': patch
'@graphcommerce/magento-product-bundle': patch
'@graphcommerce/magento-product-configurable': patch
'@graphcommerce/magento-product-grouped': patch
'@graphcommerce/magento-review': patch
'@graphcommerce/magento-wishlist': patch
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/magento-open-source': patch
'@graphcommerce/magento-storyblok': patch
---

Added `imageQuality` to `graphcommerce.config.ts`. Choose the kind (`content` or `product`) with `quality` on `<Image>` or `imageUrl()`. `quality='content'` is for content images, such as CMS images, and is the default when no quality is given, with quality 75 in place of the previous 52. `quality='product'` is for product images from the Magento catalog, with quality 52.
