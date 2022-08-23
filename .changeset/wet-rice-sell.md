---
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/magento-cart': minor
---

Added global errorhandling on cart errors. When a cart query return an error, the currentCartId wil be renewed with the actual cartId when the user is authenticated. When there is an error in a guest cart, a new cartId will be generated and the cart will be empty
