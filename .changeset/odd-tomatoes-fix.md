---
'@graphcommerce/magento-cart-coupon': patch
---

Resolve issue where a 400 error occurred due to missing coupon code data in the request. The coupon input field was being disabled before form submission, preventing the code from being included in the request payload
