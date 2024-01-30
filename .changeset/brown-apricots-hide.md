---
"@graphcommerce/magento-cart": patch
---

When a customer would return from a payment gateway and it would erroneously query the cart GraphCommerce would immediately create a new empty cart while it shouldn't.
