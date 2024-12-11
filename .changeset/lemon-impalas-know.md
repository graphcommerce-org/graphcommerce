---
'@graphcommerce/magento-cart-shipping-address': patch
'@graphcommerce/magento-cart-shipping-method': patch
'@graphcommerce/magento-payment-multisafepay': patch
'@graphcommerce/magento-cart-payment-method': patch
'@graphcommerce/mollie-magento-payment': patch
'@graphcommerce/magento-payment-adyen': patch
'@graphcommerce/magento-newsletter': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-compare': patch
'@graphcommerce/react-hook-form': patch
'@graphcommerce/magento-cart': patch
---

Moved all usages of `useFormPersist` to the `<FormPersist/>` component to prevent rerenders.
