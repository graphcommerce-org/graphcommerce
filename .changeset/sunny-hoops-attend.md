---
'@graphcommerce/magento-payment-multisafepay': patch
---

Fixed a bug in MSPPaymentHandler where successful MultiSafepay payments were prevented from redirecting to the success page due to an incorrect condition in the payment handler.
