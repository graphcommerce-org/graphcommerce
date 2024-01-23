---
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-customer': patch
---

Solved an issue where the inactive cart would set as the current cart when the customer had signed in, checked out their cart, session expired and tried to log in again.
