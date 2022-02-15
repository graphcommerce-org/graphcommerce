# Change Log

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)
  Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files,
  so that the packages link to back to the website and repository
- Updated dependencies
  [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/magento-cart@4.0.1
  - @graphcommerce/magento-cart-items@3.0.1
  - @graphcommerce/magento-product@4.0.1
  - @graphcommerce/magento-product-simple@4.0.1
  - @graphcommerce/magento-product-virtual@4.0.1

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258)
  [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)
  Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies
  [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/magento-cart@4.0.0
  - @graphcommerce/magento-cart-items@3.0.0
  - @graphcommerce/magento-product@4.0.0
  - @graphcommerce/magento-product-simple@4.0.0
  - @graphcommerce/magento-product-virtual@4.0.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-bundle@3.1.31...@graphcommerce/magento-product-bundle@3.2.0) (2021-11-12)

### Features

- added tons of translations
  ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-bundle@3.0.37...@graphcommerce/magento-product-bundle@3.1.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12
  ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-bundle@3.0.0...@graphcommerce/magento-product-bundle@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-product-bundle

# 3.0.0 (2021-09-27)

### Bug Fixes

- address fragments
  ([96e68c3](https://github.com/ho-nl/m2-pwa/commit/96e68c3f96e40dded50ec5859909a7326b47e37b))
- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- make sure an empty cart gets initialized properly
  ([12df845](https://github.com/ho-nl/m2-pwa/commit/12df8456117393cc7c387ba6e072190a831b7a58))
- product specs on product pages
  ([098798a](https://github.com/ho-nl/m2-pwa/commit/098798aec353a8a571928faae02a303fed395977))
- remove conflicting files
  ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- update magento-product imports
  ([63621b4](https://github.com/ho-nl/m2-pwa/commit/63621b44be7149014f4a5af8ac87ad1c4b0327be))
- yarn workspace packages hot reload
  ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))

### Features

- added PaymentModule API and persistent selection of form fields
  ([b67f735](https://github.com/ho-nl/m2-pwa/commit/b67f7358f62edd56a8232d625ecee56af350bfb8))
- barrel files for magento-product pages
  ([c8fdcf2](https://github.com/ho-nl/m2-pwa/commit/c8fdcf2f5b98821dffe2c47f5ea4e1847bd3bb1e))
- created stacked-pages package
  ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- **graphql:** introduced new graphql package that holds all generated files
  ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- groundwork for complete reimplementation of product pages
  ([b224da8](https://github.com/ho-nl/m2-pwa/commit/b224da8273eb5c8173ad30d006391b2291331623))
- introduced magento-product-types package
  ([1a0932b](https://github.com/ho-nl/m2-pwa/commit/1a0932b5d882608dcf8fd2e3b17ee9868f5f5776))
- **magento-graphql:** added core magentoTypePolicies
  ([bdf15d0](https://github.com/ho-nl/m2-pwa/commit/bdf15d0d3c04e88339a8385d76f3b1ab9589fde3))
- next.js 11
  ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of
  [@reachdigital](https://github.com/reachdigital)
  ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgrade to node 14
  ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## 2.0.8 (2020-10-28)

### Bug Fixes

- make sure themes extensions are found
  ([5aa18db](https://github.com/ho-nl/m2-pwa/commit/5aa18db514fd2e2f50681367e39523f8e742ece0))

### Features

- added generated graphql.ts files
  ([3e44415](https://github.com/ho-nl/m2-pwa/commit/3e44415b018e74b502e9e98479aa5e84041f337d))
- split into packages
  ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))

### BREAKING CHANGES

- huge folder structure refactor, please read README to reinstall

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-bundle@2.101.10...@graphcommerce/magento-product-bundle@2.102.0) (2021-08-12)

### Features

- upgraded to nextjs 11
  ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-bundle@2.100.19...@graphcommerce/magento-product-bundle@2.101.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing
  ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.100.11](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-product-bundle@2.100.10...@graphcommerce/magento-product-bundle@2.100.11) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates
  ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
