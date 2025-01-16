---
'@graphcommerce/magento-cart': patch
---

Solve issue where the total of the cart was zero due to discount or store credit the user couldn't proceed to the checkout. We now check for items and errors instead of the total.
