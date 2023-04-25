---
'@graphcommerce/magento-cart': patch
---

When the customer is logging in and the merge cart functionality throws an error, it would not set the current customer's cart as active, but keep the faulty cart active.
