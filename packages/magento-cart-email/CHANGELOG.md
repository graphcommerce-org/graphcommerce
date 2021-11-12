# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.105.30](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.105.29...@graphcommerce/magento-cart-email@2.105.30) (2021-11-12)


### Bug Fixes

* always show customer login form explanation ([ef51662](https://github.com/ho-nl/m2-pwa/commit/ef51662b91ad1d3851cfcc75925f8f81b214f348))





## [2.105.29](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.105.28...@graphcommerce/magento-cart-email@2.105.29) (2021-11-12)


### Bug Fixes

* **checkout-email-form:** spacing too large ([f54e217](https://github.com/ho-nl/m2-pwa/commit/f54e2170b5c47c1c33e74db45e3bcae3d3523c4e))





# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.104.37...@graphcommerce/magento-cart-email@2.105.0) (2021-10-27)


### Features

* **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))





## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.104.0...@graphcommerce/magento-cart-email@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-email





# 2.104.0 (2021-09-27)


### Bug Fixes

* adjust imports to correct ones ([c6e3092](https://github.com/ho-nl/m2-pwa/commit/c6e3092569d1c49fe138b3810704da8e04acbbe2))
* email field not filled in checkout ([910caca](https://github.com/ho-nl/m2-pwa/commit/910cacaa49fc5fef2ee4066df828c5a6dd4a2700))
* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
* implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
* make sure ComposedForm actually submits correctly ([c6499d9](https://github.com/ho-nl/m2-pwa/commit/c6499d9d36f874cd65b310cbf7f63f5a88fa86cd))
* make sure the session token gets deactivated when trying to merge carts when it cant ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))
* ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))
* rename NextButton to Button, change imports ([976adb0](https://github.com/ho-nl/m2-pwa/commit/976adb0bf906310d1efce888dcc9be1e28ce0f1b))


### Features

* add barrel file for magento-customer ([02fb7f0](https://github.com/ho-nl/m2-pwa/commit/02fb7f004de968ee968b00e364b2b370f4f7d4f1))
* **cart:** merge customer and guest carts when logging in ([25ebc0f](https://github.com/ho-nl/m2-pwa/commit/25ebc0f4e825f8512e2c3f1e01bf23a2d019b0d3))
* **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
* **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
* **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
* **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))
* next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* submit composed form sequentially ([890d839](https://github.com/ho-nl/m2-pwa/commit/890d8393d635c3777aa17cfa8d4dafc13c2e6cdc))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
* useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))


### Reverts

* Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.102.19...@graphcommerce/magento-cart-email@2.103.0) (2021-09-24)

### Features

- **inline-account:** re-added the component
  ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))

## [2.102.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.102.7...@graphcommerce/magento-cart-email@2.102.8) (2021-08-18)

### Bug Fixes

- make sure the session token gets deactivated when trying to merge carts when
  it cant
  ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))

## [2.102.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.102.4...@graphcommerce/magento-cart-email@2.102.5) (2021-08-13)

### Bug Fixes

- ref couldn't be forwarded for ShippingAddressForm
  ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.101.10...@graphcommerce/magento-cart-email@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.101.8...@graphcommerce/magento-cart-email@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.100.19...@graphcommerce/magento-cart-email@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.100.16...@graphcommerce/magento-cart-email@2.100.17) (2021-07-23)

### Bug Fixes

- adjust imports to correct ones
  ([c6e3092](https://github.com/ho-nl/m2-pwa/commit/c6e3092569d1c49fe138b3810704da8e04acbbe2))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.100.10...@graphcommerce/magento-cart-email@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
