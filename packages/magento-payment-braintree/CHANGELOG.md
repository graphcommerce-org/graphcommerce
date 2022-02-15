# Change Log

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository
- Updated dependencies
  [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-cart-payment-method@3.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies
  [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-cart-payment-method@3.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.105.32...@graphcommerce/magento-payment-braintree@2.106.0) (2021-11-12)

### Features

- added tons of translations
  ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.104.40...@graphcommerce/magento-payment-braintree@2.105.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.104.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.104.6...@graphcommerce/magento-payment-braintree@2.104.7) (2021-09-30)

### Bug Fixes

- braintree typescript warning
  ([8bb6a8a](https://github.com/ho-nl/m2-pwa/commit/8bb6a8a7bdd4d90cb1486d88263971143a571fa1))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.104.0...@graphcommerce/magento-payment-braintree@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-payment-braintree

# 2.104.0 (2021-09-27)

### Bug Fixes

- **braintree:** allow for proper initialization of braintree client libraries
  ([af87d1c](https://github.com/ho-nl/m2-pwa/commit/af87d1ccde1378127b9ef76b197d3946a9c7ca92))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- implement next-ui barrel imports
  ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- paymentDone removed in favor of a more simple clearCart method
  ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))
- **playwright:** checkout button was renamed
  ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))
- rename NextButton to Button, change imports
  ([976adb0](https://github.com/ho-nl/m2-pwa/commit/976adb0bf906310d1efce888dcc9be1e28ce0f1b))

### Features

- ability to place order after the payment has completed
  ([8fd479a](https://github.com/ho-nl/m2-pwa/commit/8fd479aded46ec1ba61b5dc42eccf4aaedff6c0c))
- added braintree libraries for checkout process
  ([970ae9a](https://github.com/ho-nl/m2-pwa/commit/970ae9a03510e6e6851ffb81758ab71daedc7096))
- added PaymentModule API and persistent selection of form fields
  ([b67f735](https://github.com/ho-nl/m2-pwa/commit/b67f7358f62edd56a8232d625ecee56af350bfb8))
- **braintree:** very basic implementation of credit card
  ([bb24f7e](https://github.com/ho-nl/m2-pwa/commit/bb24f7ec0577d018f0aff9b50de14f219e7504c5))
- checkout/payment page added to checkout
  ([7e54cd6](https://github.com/ho-nl/m2-pwa/commit/7e54cd68685543ded27b285f15f6d9729b969a02))
- created stacked-pages package
  ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- **graphql:** introduced new graphql package that holds all generated files
  ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **image:** introduced completely rewritten Image component
  ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- implemented checkmo payment method
  ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
- next.js 11
  ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **payments:** make PaymentMethodContext injectable
  ([68c664a](https://github.com/ho-nl/m2-pwa/commit/68c664adb7eb6eb86d7a819213deb87152392347))
- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14
  ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- working on payment implementation contract
  ([bc3a41a](https://github.com/ho-nl/m2-pwa/commit/bc3a41a3de25c197bd65bdb68640c82f83c4698a))

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.103.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.103.6...@graphcommerce/magento-payment-braintree@2.103.7) (2021-08-17)

### Bug Fixes

- **playwright:** checkout button was renamed
  ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.102.7...@graphcommerce/magento-payment-braintree@2.103.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.102.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.102.5...@graphcommerce/magento-payment-braintree@2.102.6) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.101.2...@graphcommerce/magento-payment-braintree@2.102.0) (2021-07-29)

### Bug Fixes

- paymentDone removed in favor of a more simple clearCart method
  ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))

### Features

- **braintree:** very basic implementation of credit card
  ([bb24f7e](https://github.com/ho-nl/m2-pwa/commit/bb24f7ec0577d018f0aff9b50de14f219e7504c5))

## [2.101.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.101.0...@graphcommerce/magento-payment-braintree@2.101.1) (2021-07-28)

### Bug Fixes

- **braintree:** allow for proper initialization of braintree client libraries
  ([af87d1c](https://github.com/ho-nl/m2-pwa/commit/af87d1ccde1378127b9ef76b197d3946a9c7ca92))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.100.19...@graphcommerce/magento-payment-braintree@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-braintree@2.100.10...@graphcommerce/magento-payment-braintree@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
