---
'@graphcommerce/magento-payment-multisafepay': patch
---

`MSPPaymentPlaceOrder` locks the cart with the number of the placed order. It read an undeclared `order`, so placing an order threw a `ReferenceError`.
