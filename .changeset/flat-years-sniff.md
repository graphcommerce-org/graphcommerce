---
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/magento-cart-items': minor
'@graphcommerce/magento-pagebuilder': minor
'@graphcommerce/magento-product': minor
'@graphcommerce/magento-store': minor
'@graphcommerce/magento-wishlist': minor
---

Moved to the singular product page `/p/[url]`, the `pages/product/*/[url]` will now redirect permanently to /p/.

- Remove all `pages/product/*/[url]` pages from your project
- Apply your modifications made on the `pages/product/*/[url]` pages to the new `/p/[url]` page
