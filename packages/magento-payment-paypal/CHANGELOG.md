# @graphcommerce/magento-payment-paypal

## 9.0.0-canary.108

## 9.0.0-canary.107

## 9.0.0-canary.106

## 9.0.0-canary.105

## 9.0.0-canary.104

## 9.0.0-canary.103

## 9.0.0-canary.60

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 7.0.0

### Patch Changes

- [#1914](https://github.com/graphcommerce-org/graphcommerce/pull/1914) [`72fb254a0`](https://github.com/graphcommerce-org/graphcommerce/commit/72fb254a0046001ce4288501b0de6871fada819b) - User wouldn't be redirect to the paypal website, not allowing users to checkout ([@paales](https://github.com/paales))

- [#1943](https://github.com/graphcommerce-org/graphcommerce/pull/1943) [`138215b45`](https://github.com/graphcommerce-org/graphcommerce/commit/138215b453703f44243c85b3bfab58814d86131c) - When a PayPal buyer would return to the website it would sometimes clear the buyers token ([@paales](https://github.com/paales))

## 6.0.0

### Patch Changes

- [#1841](https://github.com/graphcommerce-org/graphcommerce/pull/1841) [`03c104d7f`](https://github.com/graphcommerce-org/graphcommerce/commit/03c104d7f5d4ffd71eb9e26fe4fd4b77fd4c23c8) - Split `PayPalPaymentOptionsAndPlaceOrder` in `PaymentOptionsNoop` and `PayPalPaymentPlaceOrder` components to allow for surcharges when selecting a payment method. ([@paales](https://github.com/paales))

- [#1841](https://github.com/graphcommerce-org/graphcommerce/pull/1841) [`1ff022c4b`](https://github.com/graphcommerce-org/graphcommerce/commit/1ff022c4bd8ad1d9fa8c1760076f003af06ce421) - PaymentMethodUpdated is now @injectable to allow for easier customisation. ([@paales](https://github.com/paales))

- [#1851](https://github.com/graphcommerce-org/graphcommerce/pull/1851) [`5adadf4ba`](https://github.com/graphcommerce-org/graphcommerce/commit/5adadf4ba023e861409a3925b5cda1e20dbb256c) - Make sure the PayerID isn’t required for non-paypal method ([@paales](https://github.com/paales))

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`ab4d6d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/ab4d6d8e18485b4ca4ca98f534e4f64f6849d952) - Make sure the payment method is set before we’re creating a paypal express token, so possible surcharges get applied ([@LaurensFranken](https://github.com/LaurensFranken))

## 5.1.0

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`f08bffd63`](https://github.com/graphcommerce-org/graphcommerce/commit/f08bffd63780cb626f072b25c2fd4da37543b6f7) - Moved all Payment methods to the [GraphCommerce plugin system](https://www.graphcommerce.org/docs/framework/plugins)

  Upgrade guide:

  - The upgrade removes all the payment gateway packages from the `package.json`, remove them for now.
  - Proceed to upgrade normally
  - Add back all the payment modules following the [GraphCommerce Magento docs](https://graphcommerce.org/docs/magento).

  (This removes the requirement to cleanup the payment methods when creating a first installation. 🎉) ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`4f85e4878`](https://github.com/graphcommerce-org/graphcommerce/commit/4f85e4878e4ad0dd528d60ad35826da0677059a9) - Add the ability to specificy plugins on the package name (e.g. `@graphcommerce/magento-cart-payment-method`) ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`be10e8cd1`](https://github.com/graphcommerce-org/graphcommerce/commit/be10e8cd1dce172a914ee9e5f65fdca4d0929fc8) - Migrated payment methods to use the new `onSuccess` method from `PaymentMethodContextProvider` instead of redirecting manually, makes sure the onSuccess method can be used by plugins. ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

## 4.13.0

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 1.0.2

### Patch Changes

- [#1693](https://github.com/graphcommerce-org/graphcommerce/pull/1693) [`63e52a25d`](https://github.com/graphcommerce-org/graphcommerce/commit/63e52a25d35aa9600820155760fce23e91920185) Thanks [@paales](https://github.com/paales)! - Make release public

## 1.0.1

### Patch Changes

- [#1692](https://github.com/graphcommerce-org/graphcommerce/pull/1692) [`a7fbe58d4`](https://github.com/graphcommerce-org/graphcommerce/commit/a7fbe58d4bbb43c59fa2ead05935757d2013404c) Thanks [@paales](https://github.com/paales)! - Make sure the cartLock state is refreshed when the page is loaded with the bfcache

- [#1692](https://github.com/graphcommerce-org/graphcommerce/pull/1692) [`edbecfbfd`](https://github.com/graphcommerce-org/graphcommerce/commit/edbecfbfd532a6c78ae75ffe850c4bcf898e855d) Thanks [@paales](https://github.com/paales)! - Locking the cart when navigating away from the checkout and unlock the cart when pressing back. Made the justLocked flag a global state.

- Updated dependencies [[`a7fbe58d4`](https://github.com/graphcommerce-org/graphcommerce/commit/a7fbe58d4bbb43c59fa2ead05935757d2013404c), [`a26a2d05e`](https://github.com/graphcommerce-org/graphcommerce/commit/a26a2d05eecabeeef70e4d69105343197ae092b7), [`edbecfbfd`](https://github.com/graphcommerce-org/graphcommerce/commit/edbecfbfd532a6c78ae75ffe850c4bcf898e855d)]:
  - @graphcommerce/magento-cart-payment-method@3.6.9
  - @graphcommerce/magento-cart@4.9.5

## 1.0.0

### Major Changes

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`4490bde21`](https://github.com/graphcommerce-org/graphcommerce/commit/4490bde217c49d022d39486b21ca77a7dbc74f4c) Thanks [@paales](https://github.com/paales)! - Created PayPal express integration

### Patch Changes

- Updated dependencies [[`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e), [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65), [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9)]:
  - @graphcommerce/next-ui@4.29.3
  - @graphcommerce/magento-cart-payment-method@3.6.8
  - @graphcommerce/ecommerce-ui@1.5.8
  - @graphcommerce/magento-cart@4.9.4
  - @graphcommerce/magento-store@4.3.6
