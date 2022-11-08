---
'@graphcommerce/magento-cart-payment-method': patch
'@graphcommerce/magento-payment-adyen': patch
'@graphcommerce/magento-payment-braintree': patch
'@graphcommerce/magento-payment-included': patch
'@graphcommerce/magento-payment-klarna': patch
'@graphcommerce/magento-payment-multisafepay': patch
'@graphcommerce/magento-payment-paypal': patch
'@graphcommerce/mollie-magento-payment': patch
---

Migrated payment methods to use the new `onSuccess` method from `PaymentMethodContextProvider` instead of redirecting manually, makes sure the onSuccess method can be used by plugins.
