---
'@graphcommerce/docs': minor
'@graphcommerce/magento-cart-pickup': minor
---

Moved Magento Cart Pickup shipping method to the [GraphCommerce plugin system](https://www.graphcommerce.org/docs/framework/plugins)

Upgrade guide:

- The upgrade removes `@graphcommerce/magento-cart-pickup` package from your `package.json`, remove them for now.
- Proceed to upgrade normally
- Add back `@graphcommerce/magento-cart-pickup`, following the [GraphCommerce Magento docs](https://graphcommerce.org/docs/magento).
