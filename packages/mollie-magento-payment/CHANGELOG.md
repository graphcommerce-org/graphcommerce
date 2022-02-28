# Change Log

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96)
  Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278)
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20)
  Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

* Updated dependencies
  [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96),
  [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20),
  [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d),
  [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-cart@4.1.2
  - @graphcommerce/magento-cart-payment-method@3.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2)
  Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from
  `dependencies` to `peerDependencies`. The result of this is that there will be significantly less
  duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276)
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)
  Thanks [@paales](https://github.com/paales)! - Upgraded to
  [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be
  implementing
  [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta)
  soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the
  frontend to be able to revalidate pages manually.

* Updated dependencies
  [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7),
  [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2),
  [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b),
  [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275),
  [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d),
  [`5a4809b1a`](https://github.com/ho-nl/m2-pwa/commit/5a4809b1a705aa32f620f520085df48ee25f9949)]:
  - @graphcommerce/magento-cart@4.1.1
  - @graphcommerce/magento-cart-payment-method@3.0.2
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-store@4.0.2

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

## [2.106.24](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/mollie-magento-payment@2.106.23...@graphcommerce/mollie-magento-payment@2.106.24) (2021-12-20)

### Bug Fixes

- animations would run on background page, make sure animations are not running when page is not
  active
  ([2fcf4b8](https://github.com/ho-nl/m2-pwa/commit/2fcf4b8a853108147477e3a67c7ea202abb2842f))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/mollie-magento-payment@2.105.32...@graphcommerce/mollie-magento-payment@2.106.0) (2021-11-12)

### Features

- added tons of translations
  ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [2.105.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/mollie-magento-payment@2.105.8...@graphcommerce/mollie-magento-payment@2.105.9) (2021-11-02)

### Bug Fixes

- input labels
  ([ba46c9a](https://github.com/ho-nl/m2-pwa/commit/ba46c9a17b3b460daab5015df39ac9ae66858df4))
- overlapping checkmark icon
  ([b4da61a](https://github.com/ho-nl/m2-pwa/commit/b4da61ae33ab058a56f0f32c2874a2e77d77d01d))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/mollie-magento-payment@2.104.33...@graphcommerce/mollie-magento-payment@2.105.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.104.13](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/mollie-magento-payment@2.104.12...@graphcommerce/mollie-magento-payment@2.104.13) (2021-10-08)

### Bug Fixes

- **mollie:** make sure we're redirected to the success page
  ([316d2b2](https://github.com/ho-nl/m2-pwa/commit/316d2b2a99189f093e74db98521c27e8e7267dd4))

## [2.104.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/mollie-magento-payment@2.104.10...@graphcommerce/mollie-magento-payment@2.104.11) (2021-10-07)

### Bug Fixes

- make sure if no payment method is filled in we get an error shown
  ([a203e57](https://github.com/ho-nl/m2-pwa/commit/a203e570caad0732427a178e8e8b10b4a15d676b))

# 2.104.0 (2021-09-29)

### Bug Fixes

- make sure mollie only gets build optionally
  ([e5e2347](https://github.com/ho-nl/m2-pwa/commit/e5e23475e170dc2fc0c13103dfb8fbdb9009715f))
- make sure the mollie module doesn't start with magento- to prevent building from node moduels
  ([ed406b9](https://github.com/ho-nl/m2-pwa/commit/ed406b9f56bd8cb5df0463cc50e4b1e9a728d4ca))

### Features

- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))

## [2.103.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.103.0...@graphcommerce/magento-payment-mollie@2.103.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-payment-mollie

# 2.103.0 (2021-09-27)

### Bug Fixes

- make sure mollie only gets build optionally
  ([e5e2347](https://github.com/ho-nl/m2-pwa/commit/e5e23475e170dc2fc0c13103dfb8fbdb9009715f))

### Features

- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.102.18](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.102.17...@graphcommerce/magento-payment-mollie@2.102.18) (2021-09-23)

### Bug Fixes

- make sure mollie only gets build optionally
  ([e5e2347](https://github.com/ho-nl/m2-pwa/commit/e5e23475e170dc2fc0c13103dfb8fbdb9009715f))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.101.10...@graphcommerce/magento-payment-mollie@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.101.8...@graphcommerce/magento-payment-mollie@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client"
  ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## [2.101.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.101.2...@graphcommerce/magento-payment-mollie@2.101.3) (2021-07-29)

### Bug Fixes

- paymentDone removed in favor of a more simple clearCart method
  ([5314f77](https://github.com/ho-nl/m2-pwa/commit/5314f7752c2f75a55dcd926bfc26607124561e5d))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.100.19...@graphcommerce/magento-payment-mollie@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-payment-mollie@2.100.10...@graphcommerce/magento-payment-mollie@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
