# Change Log

## 3.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-cart@4.1.4
  - @graphcommerce/magento-customer@4.1.4
  - @graphcommerce/magento-product@4.0.6
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/react-hook-form@3.0.4

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-cart@4.1.2
  - @graphcommerce/magento-customer@4.1.2
  - @graphcommerce/magento-product@4.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275) Thanks [@paales](https://github.com/paales)! - Fixed extraction of translations and updated various translations for english 🇺🇸🇬🇧 and dutch 🇳🇱

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

- Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d), [`5a4809b1a`](https://github.com/ho-nl/m2-pwa/commit/5a4809b1a705aa32f620f520085df48ee25f9949)]:
  - @graphcommerce/magento-cart@4.1.1
  - @graphcommerce/magento-customer@4.1.1
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-product@4.0.2
  - @graphcommerce/magento-store@4.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-customer@4.0.1
  - @graphcommerce/magento-product@4.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-customer@4.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.106.4...@graphcommerce/magento-cart-email@2.107.0) (2021-12-01)

### Features

- add title to login form ([563157b](https://github.com/ho-nl/m2-pwa/commit/563157bc7059d0b10d8e93c71b918b816ca45943))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.105.31...@graphcommerce/magento-cart-email@2.106.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [2.105.30](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.105.29...@graphcommerce/magento-cart-email@2.105.30) (2021-11-12)

### Bug Fixes

- always show customer login form explanation ([ef51662](https://github.com/ho-nl/m2-pwa/commit/ef51662b91ad1d3851cfcc75925f8f81b214f348))

## [2.105.29](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.105.28...@graphcommerce/magento-cart-email@2.105.29) (2021-11-12)

### Bug Fixes

- **checkout-email-form:** spacing too large ([f54e217](https://github.com/ho-nl/m2-pwa/commit/f54e2170b5c47c1c33e74db45e3bcae3d3523c4e))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.104.37...@graphcommerce/magento-cart-email@2.105.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.104.0...@graphcommerce/magento-cart-email@2.104.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-cart-email

# 2.104.0 (2021-09-27)

### Bug Fixes

- adjust imports to correct ones ([c6e3092](https://github.com/ho-nl/m2-pwa/commit/c6e3092569d1c49fe138b3810704da8e04acbbe2))
- email field not filled in checkout ([910caca](https://github.com/ho-nl/m2-pwa/commit/910cacaa49fc5fef2ee4066df828c5a6dd4a2700))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- make sure ComposedForm actually submits correctly ([c6499d9](https://github.com/ho-nl/m2-pwa/commit/c6499d9d36f874cd65b310cbf7f63f5a88fa86cd))
- make sure the session token gets deactivated when trying to merge carts when it cant ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))
- ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))
- rename NextButton to Button, change imports ([976adb0](https://github.com/ho-nl/m2-pwa/commit/976adb0bf906310d1efce888dcc9be1e28ce0f1b))

### Features

- add barrel file for magento-customer ([02fb7f0](https://github.com/ho-nl/m2-pwa/commit/02fb7f004de968ee968b00e364b2b370f4f7d4f1))
- **cart:** merge customer and guest carts when logging in ([25ebc0f](https://github.com/ho-nl/m2-pwa/commit/25ebc0f4e825f8512e2c3f1e01bf23a2d019b0d3))
- **cart:** when a cart is not active anymore show a clear cart button ([5d04a14](https://github.com/ho-nl/m2-pwa/commit/5d04a14726c040b20b34c0b88f923aee1dff22e5))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- submit composed form sequentially ([890d839](https://github.com/ho-nl/m2-pwa/commit/890d8393d635c3777aa17cfa8d4dafc13c2e6cdc))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.102.19...@graphcommerce/magento-cart-email@2.103.0) (2021-09-24)

### Features

- **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))

## [2.102.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.102.7...@graphcommerce/magento-cart-email@2.102.8) (2021-08-18)

### Bug Fixes

- make sure the session token gets deactivated when trying to merge carts when it cant ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))

## [2.102.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.102.4...@graphcommerce/magento-cart-email@2.102.5) (2021-08-13)

### Bug Fixes

- ref couldn't be forwarded for ShippingAddressForm ([1f90f1a](https://github.com/ho-nl/m2-pwa/commit/1f90f1a30437d656fcf841026ad13bb2b45d831b))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.101.10...@graphcommerce/magento-cart-email@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.101.8...@graphcommerce/magento-cart-email@2.101.9) (2021-08-09)

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.100.19...@graphcommerce/magento-cart-email@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.100.16...@graphcommerce/magento-cart-email@2.100.17) (2021-07-23)

### Bug Fixes

- adjust imports to correct ones ([c6e3092](https://github.com/ho-nl/m2-pwa/commit/c6e3092569d1c49fe138b3810704da8e04acbbe2))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-cart-email@2.100.10...@graphcommerce/magento-cart-email@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
