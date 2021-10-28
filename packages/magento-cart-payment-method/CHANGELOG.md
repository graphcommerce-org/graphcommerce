# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.108.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.108.2...@graphcommerce/magento-cart-payment-method@2.108.3) (2021-10-28)


### Bug Fixes

* update SvgImage to SvgImageSimple ([f116543](https://github.com/ho-nl/m2-pwa/commit/f116543730853fa9782abff0ccacee7032e85789))





# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.107.6...@graphcommerce/magento-cart-payment-method@2.108.0) (2021-10-27)


### Features

* **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))





# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.106.16...@graphcommerce/magento-cart-payment-method@2.107.0) (2021-10-19)


### Features

* **framer-scroller:** better defaults so the Scroller doesn't look broken when providing no props ([b177ce9](https://github.com/ho-nl/m2-pwa/commit/b177ce9570abb9ccfd4eb5cc34e43d157bb4e81a))





## [2.106.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.106.4...@graphcommerce/magento-cart-payment-method@2.106.5) (2021-10-08)


### Bug Fixes

*  make sure we can useCartLock on the success page ([139349a](https://github.com/ho-nl/m2-pwa/commit/139349a73836c0c58c5d8000a801c912dbe23b3b))





## [2.106.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.106.3...@graphcommerce/magento-cart-payment-method@2.106.4) (2021-10-07)


### Bug Fixes

* make sure if no payment method is filled in we get an error shown ([a203e57](https://github.com/ho-nl/m2-pwa/commit/a203e570caad0732427a178e8e8b10b4a15d676b))





# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.105.11...@graphcommerce/magento-cart-payment-method@2.106.0) (2021-10-04)


### Features

* sort payment methods by availability ([52f5d45](https://github.com/ho-nl/m2-pwa/commit/52f5d450a7a2fdec0c7eea9cd5d48336cb304138))





## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.105.0...@graphcommerce/magento-cart-payment-method@2.105.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-payment-method





# 2.105.0 (2021-09-27)


### Bug Fixes

* **checkout:** purchaseorder and other build in methods wouldnt properly submit ([331cb8e](https://github.com/ho-nl/m2-pwa/commit/331cb8e2bed58c14cd41fceeab03e2cdfbe7e6a9))
* do not use ToggleButtonGroup, only use the ToggleButton ([5172f70](https://github.com/ho-nl/m2-pwa/commit/5172f709ee26122b0a8700afb4325f23cb9ba9b9))
* ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
* implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
* paymentDone removed in favor of a more simple clearCart method ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))
* playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))
* **playwright:** checkout button was renamed ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))
* rename NextButton to Button, change imports ([976adb0](https://github.com/ho-nl/m2-pwa/commit/976adb0bf906310d1efce888dcc9be1e28ce0f1b))


### Features

* **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
* coupon form on payment page ([a163961](https://github.com/ho-nl/m2-pwa/commit/a1639617be756b357177fcce255cf662c5314499))
* **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
* **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
* implemented checkmo payment method ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
* implemented purchase order ([3a40033](https://github.com/ho-nl/m2-pwa/commit/3a40033cd4d6712a17bb9c41a8841ebf7aa2f025))
* implemented the new mollie payment api ([a8b38a9](https://github.com/ho-nl/m2-pwa/commit/a8b38a9a45207e180f795e81bf5ac759f01a583d))
* **mollie:** first version of mollie payment methods ([e2f7d78](https://github.com/ho-nl/m2-pwa/commit/e2f7d78e50a9afe928f1d8c478f946e03c63b0f2))
* **mollie:** pay with credit card made working ([5cda84e](https://github.com/ho-nl/m2-pwa/commit/5cda84e0b9c54238ae6adaa34f9e2ad77a708508))
* next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
* only show free payment method when zero subtotal quote ([fd3ba86](https://github.com/ho-nl/m2-pwa/commit/fd3ba86d3060ebe7dc72ce27fca21464b46b4392))
* **payment-agreements-form:** checkout agreements checkboxes ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c816499d220a2ce940672a95beca508b78ddc9))
* **payments:** make PaymentMethodContext injectable ([68c664a](https://github.com/ho-nl/m2-pwa/commit/68c664adb7eb6eb86d7a819213deb87152392347))
* **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
* **react-hook-form:** added buttonState to ComposedSubmit ([57e77c2](https://github.com/ho-nl/m2-pwa/commit/57e77c29f17720f7f3ee3b63be82779c0e5d8714))
* renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
* solve issue where the order couldn’t be submitted ([ec0d357](https://github.com/ho-nl/m2-pwa/commit/ec0d3579a1277976e2dc515f420996cf716f83a6))
* upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
* useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))


### Reverts

* Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.103.18...@graphcommerce/magento-cart-payment-method@2.104.0) (2021-09-24)

### Features

- **payment-agreements-form:** checkout agreements checkboxes
  ([13c8164](https://github.com/ho-nl/m2-pwa/commit/13c816499d220a2ce940672a95beca508b78ddc9))

## [2.103.15](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.103.14...@graphcommerce/magento-cart-payment-method@2.103.15) (2021-09-23)

## [2.103.15](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.103.14...@graphcommerce/magento-cart-payment-method@2.103.15) (2021-09-23)

### Bug Fixes

- do not use ToggleButtonGroup, only use the ToggleButton
  ([5172f70](https://github.com/ho-nl/m2-pwa/commit/5172f709ee26122b0a8700afb4325f23cb9ba9b9))

## [2.103.12](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.103.11...@graphcommerce/magento-cart-payment-method@2.103.12) (2021-09-01)

### Bug Fixes

- playwright can't find the place order button
  ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

## [2.103.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.103.3...@graphcommerce/magento-cart-payment-method@2.103.4) (2021-08-17)

### Bug Fixes

- **playwright:** checkout button was renamed
  ([09e5b79](https://github.com/ho-nl/m2-pwa/commit/09e5b79333708cfac04232d8071d1dad72968297))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.102.2...@graphcommerce/magento-cart-payment-method@2.103.0) (2021-08-13)

### Features

- coupon form on payment page
  ([a163961](https://github.com/ho-nl/m2-pwa/commit/a1639617be756b357177fcce255cf662c5314499))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.101.10...@graphcommerce/magento-cart-payment-method@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.101.8...@graphcommerce/magento-cart-payment-method@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.101.2...@graphcommerce/magento-cart-payment-method@2.101.3) (2021-07-29)

### Bug Fixes

- paymentDone removed in favor of a more simple clearCart method
  ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.100.19...@graphcommerce/magento-cart-payment-method@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-payment-method@2.100.10...@graphcommerce/magento-cart-payment-method@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
