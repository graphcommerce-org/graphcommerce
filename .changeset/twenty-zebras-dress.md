---
'@graphcommerce/magento-payment-paypal': patch
---

Make sure the payment method is set before we’re creating a paypal express token, so possible surcharges get applied
