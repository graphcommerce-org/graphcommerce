---
'@graphcommerce/docs': patch
'@graphcommerce/magento-payment-braintree': minor
'@graphcommerce/magento-payment-included': minor
'@graphcommerce/magento-payment-paypal': minor
'@graphcommerce/mollie-magento-payment': minor
---

Moved all Payment methods to the [GraphCommerce plugin system](https://www.graphcommerce.org/docs/framework/plugins)

Upgrade guide:

- The upgrade removes all the payment gateway packages from the `package.json`, remove them for now.
- Proceed to update normally
- Add back all the payment modules following the [GraphCommerce Magento docs](https://graphcommerce.org/docs/magento).

(This removes the requirement to cleanup the payment methods when creating a first installation. 🎉)
