# Magento Cart Pickup

Integrates GraphCommerce with MSI (Multi Source Inventory) and adds support for
pickup in store.

## Installation

1. Find current version of your `@graphcommerce/magento-cart-shipping-method` in
   your package.json.
2. `yarn add @graphcommerce/magento-cart-pickup@1.2.3` (replace 1.2.3 with the
   version of the step above)

## Magento configuration

Make sure store pickup (`instore-pickup`) is enabled in Magento, it should show
up as a shipping method. If instore pickup is selected it should show the pickup
location selector.
