# Change Log

## 9.0.4-canary.10

### Patch Changes

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`cbf92b8`](https://github.com/graphcommerce-org/graphcommerce/commit/cbf92b83a677c51c62dc723dcc7bf456a79125e4) - Remove dependencies from `@graphcommerce/googletagmanager` and `@graphcommerce/googleanalytics` on Magento packages and make the datalayer optional ([@paales](https://github.com/paales))

## 9.0.4-canary.9

## 9.0.4-canary.8

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0

## 9.0.0

### Patch Changes

- [#2317](https://github.com/graphcommerce-org/graphcommerce/pull/2317) [`2f4a61d`](https://github.com/graphcommerce-org/graphcommerce/commit/2f4a61dfee853579c96fceb5351e459aa9524a60) - Moved import locations of Google Analytics and Google Tagmanager scripts to their officialrecommended locations. ([@paales](https://github.com/paales))

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`d500643`](https://github.com/graphcommerce-org/graphcommerce/commit/d500643138799b6db1610cb10a1d065d6219d8ea) - Resolve peer dependency issues so we get a clean install ([@paales](https://github.com/paales))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

- [#2403](https://github.com/graphcommerce-org/graphcommerce/pull/2403) [`9f01825`](https://github.com/graphcommerce-org/graphcommerce/commit/9f01825f9f4101ed009515735b75182673d942b5) - fix: Google tag manager noscript tag would output escaped html causing hydration errors ([@FrankHarland](https://github.com/FrankHarland))

## 8.0.5

### Patch Changes

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`cabeadc`](https://github.com/graphcommerce-org/graphcommerce/commit/cabeadce2b73ce072a2fa8b8ab1ab49907cda13b) - Added core web vitals measurements to the datalayer. ([@paales](https://github.com/paales))

## 8.0.4

### Patch Changes

- [#2158](https://github.com/graphcommerce-org/graphcommerce/pull/2158) [`34de808`](https://github.com/graphcommerce-org/graphcommerce/commit/34de8085e9352d1f3b20b26746685370ea10ab90) - Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events. ([@mikekeehnen](https://github.com/mikekeehnen))

## 8.0.0

### Minor Changes

- [#2127](https://github.com/graphcommerce-org/graphcommerce/pull/2127) [`124e6c9`](https://github.com/graphcommerce-org/graphcommerce/commit/124e6c92aa3b4b77f54235f0682c38438fd619b6) - Made all Magento dependencies optional in the `googleanalytics` and `googletagmanager` packages, allowing it to be installed in any project. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 6.0.0

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

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

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`85afcf4d0`](https://github.com/graphcommerce-org/graphcommerce/commit/85afcf4d011701f4b80e59e2b2b52a2e1f99a655) - Google Tagmanager now uses the new plugin system ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`fc9de1160`](https://github.com/graphcommerce-org/graphcommerce/commit/fc9de1160714cb909a9d0cb6fc0c068422f35310) - GoogleTagManagerScript is now added with a plugin ([@paales](https://github.com/paales))

### Patch Changes

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

## 2.0.10

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 2.0.9

### Patch Changes

- [#1617](https://github.com/graphcommerce-org/graphcommerce/pull/1617) [`978e22c1e`](https://github.com/graphcommerce-org/graphcommerce/commit/978e22c1e1c8f29cfda246a7ec2a24e3b570435c) Thanks [@paales](https://github.com/paales)! - Prevent error when dataLayer isn’t present in the window

## 2.0.8

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

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
