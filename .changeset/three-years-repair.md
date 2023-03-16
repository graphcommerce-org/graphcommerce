---
'@graphcommerce/mollie-magento-payment': patch
---

Mollie order success would hang on the payment page because there wasn't a cart_id in the URL present.
