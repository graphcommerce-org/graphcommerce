---
'@graphcommerce/magento-wishlist': patch
---

`useWishlistItems` takes `currentPage` and `pageSize` and returns `count`, the number of items in the wishlist. The wishlist button and the product page load up to 999 items. Magento returns 20 items by default, so with more than 20 items the button did not find the other products.
