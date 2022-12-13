---
'@graphcommerce/magento-cart': minor
'@graphcommerce/magento-cart-items': minor
'@graphcommerce/magento-product': minor
'@graphcommerce/magento-graphql': minor
'@graphcommerce/magento-graphcms': patch
---

Show cart item error messages when running Magento >= 2.4.5 or this [patch is applied](https://raw.githubusercontent.com/graphcommerce-org/graphcommerce/main/packages/magento-cart/243-244-magento-module-quote-graphql-cart-item-errors.patch)

- Fixes an issue where the cart can get into a broken state, if items contain errors.
- AddToCartForm now shows a success message if there is an error but the error is related to another item in the cart.
- Disable checkout buttons when there are cart item errors and show a message.
