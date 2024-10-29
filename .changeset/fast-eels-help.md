---
'@graphcommerce/magento-cart-payment-method': patch
---

Due to a cyclic dependency the actual `<PaymentMethodPlaceOrder />` button would sometimes be undefined.
