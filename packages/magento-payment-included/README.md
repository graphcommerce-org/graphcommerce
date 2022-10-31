# Magento Payment built in methods

Integrates GraphCommerce with the Magento built in methods:

- purchaseorder
- banktransfer
- checkmo
- cashondelivery
- free

## Installation

1. Find current version of your `@graphcommerce/magento-cart-payment-method` in
   your package.json.
2. `yarn add @graphcommerce/magento-payment-included@1.2.3` (replace 1.2.3 with
   the version of the step above)

This package uses GraphCommerce plugin systems, so there is no code modification
required.

## Known issues

- At the moment this package is required because we need the `free` method to be
  available in the checkout. This contractics the idea of plugins as they must
  be optional.
