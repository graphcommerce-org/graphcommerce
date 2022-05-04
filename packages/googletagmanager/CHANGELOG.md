# Change Log

## 2.0.7

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 2.0.6

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 2.0.5

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 2.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 2.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

## 2.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 2.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 2.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.8](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googletagmanager@1.0.7...@graphcommerce/googletagmanager@1.0.8) (2021-12-20)

### Bug Fixes

- make sure we're not loading gogole properties when keys are not given ([8636715](https://github.com/ho-nl/m2-pwa/commit/8636715d61985e0919208ffb64354c3ebb43ed01))

## [1.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googletagmanager@0.3.2...@graphcommerce/googletagmanager@1.0.1) (2021-11-03)

### Bug Fixes

- simplified google tagmanager and create 1.0.0 ([21ac284](https://github.com/ho-nl/m2-pwa/commit/21ac28484de6c12d54f6cf73ad04e459d74892a7))

# [0.3.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googletagmanager@0.2.10...@graphcommerce/googletagmanager@0.3.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [0.2.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googletagmanager@0.2.0...@graphcommerce/googletagmanager@0.2.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/googletagmanager

# 0.2.0 (2021-09-27)

### Bug Fixes

- use gtm id directly from process.env ([1682834](https://github.com/ho-nl/m2-pwa/commit/16828342b0f432da5c7051b1b9834fdad1c58ec8))

### Features

- no gtm id present warning ([94cda8a](https://github.com/ho-nl/m2-pwa/commit/94cda8a30a3ec556d3e5484824fbf349e2e1e342))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))

# 0.1.0 (2021-09-22)

### Bug Fixes

- use gtm id directly from process.env ([1682834](https://github.com/ho-nl/m2-pwa/commit/16828342b0f432da5c7051b1b9834fdad1c58ec8))

### Features

- no gtm id present warning ([94cda8a](https://github.com/ho-nl/m2-pwa/commit/94cda8a30a3ec556d3e5484824fbf349e2e1e342))
