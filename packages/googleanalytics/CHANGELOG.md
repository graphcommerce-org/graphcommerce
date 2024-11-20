# Change Log

## 9.0.0-canary.60

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 8.1.0-canary.49

### Patch Changes

- [#2317](https://github.com/graphcommerce-org/graphcommerce/pull/2317) [`2f4a61d`](https://github.com/graphcommerce-org/graphcommerce/commit/2f4a61dfee853579c96fceb5351e459aa9524a60) - Moved import locations of Google Analytics and Google Tagmanager scripts to their recommended locations ([@paales](https://github.com/paales))

## 8.0.5

### Patch Changes

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`cabeadc`](https://github.com/graphcommerce-org/graphcommerce/commit/cabeadce2b73ce072a2fa8b8ab1ab49907cda13b) - Added core web vitals measurements to the datalayer. ([@paales](https://github.com/paales))

## 8.0.4

### Patch Changes

- [#2158](https://github.com/graphcommerce-org/graphcommerce/pull/2158) [`34de808`](https://github.com/graphcommerce-org/graphcommerce/commit/34de8085e9352d1f3b20b26746685370ea10ab90) - Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events. ([@mikekeehnen](https://github.com/mikekeehnen))

## 8.0.0

### Minor Changes

- [#2099](https://github.com/graphcommerce-org/graphcommerce/pull/2099) [`ff796b8`](https://github.com/graphcommerce-org/graphcommerce/commit/ff796b838fae6cb5e35b101500133b0235a8677d) - Support for all customizable product options (except file upload) on the product pages and in the cart. ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [#2127](https://github.com/graphcommerce-org/graphcommerce/pull/2127) [`124e6c9`](https://github.com/graphcommerce-org/graphcommerce/commit/124e6c92aa3b4b77f54235f0682c38438fd619b6) - Made all Magento dependencies optional in the `googleanalytics` and `googletagmanager` packages, allowing it to be installed in any project. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 7.0.1

### Patch Changes

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`f1200dada`](https://github.com/graphcommerce-org/graphcommerce/commit/f1200dadabb12a6d892de6c7b4dd4bf53a54f884) - Solved an issue the events wouldn't fire for RemoveItemFromCart and UpdateItemQuantity ([@paales](https://github.com/paales))

- [#2047](https://github.com/graphcommerce-org/graphcommerce/pull/2047) [`136580b39`](https://github.com/graphcommerce-org/graphcommerce/commit/136580b39e3cffdd07e3fa087e049bd532c3e8f1) - Updated all dependencies to the latest version where possible. ([@paales](https://github.com/paales))

## 7.0.0

### Patch Changes

- [#1944](https://github.com/graphcommerce-org/graphcommerce/pull/1944) [`d83c92b76`](https://github.com/graphcommerce-org/graphcommerce/commit/d83c92b767cfab24b33b7530837e601f1b49de38) - When there are no items in the cart, do not send a viewCart event ([@paales](https://github.com/paales))

- [#1915](https://github.com/graphcommerce-org/graphcommerce/pull/1915) [`4c8d6fc73`](https://github.com/graphcommerce-org/graphcommerce/commit/4c8d6fc734a83b9ffa078abf10b26c65e49f4940) - GaViewItem would still be enabled even when googleAnalyticsId was enabled ([@paales](https://github.com/paales))

- [#2031](https://github.com/graphcommerce-org/graphcommerce/pull/2031) [`4d8fc9e99`](https://github.com/graphcommerce-org/graphcommerce/commit/4d8fc9e998fc9361282833316ec9564da0644ed6) - Eslint fixes and suppress accepted warnings ([@paales](https://github.com/paales))

## 6.0.1

### Patch Changes

- [#1861](https://github.com/graphcommerce-org/graphcommerce/pull/1861) [`9ff829e49`](https://github.com/graphcommerce-org/graphcommerce/commit/9ff829e497477d67cdd83a0e90bb8cc8c9ff41b8) - fix exported path to RemoveItemFromCartFab ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0

### Patch Changes

- [#1809](https://github.com/graphcommerce-org/graphcommerce/pull/1809) [`2da3c9214`](https://github.com/graphcommerce-org/graphcommerce/commit/2da3c92148aef08813b95e404a25796acf0eefd2) - Google Analytics now supports view_item, view_cart and remove_from_cart ([@mikekeehnen](https://github.com/mikekeehnen))

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

- [#1835](https://github.com/graphcommerce-org/graphcommerce/pull/1835) [`393d62cf1`](https://github.com/graphcommerce-org/graphcommerce/commit/393d62cf1833a61eb98777b7eab91ea891668e57) - Google analytics uses the new configuration system and will use googleAnalyticsId ([@paales](https://github.com/paales))

## 5.1.0

### Minor Changes

- [#1754](https://github.com/graphcommerce-org/graphcommerce/pull/1754) [`f9cc9d45e`](https://github.com/graphcommerce-org/graphcommerce/commit/f9cc9d45ec500a719fd0b5f4c5673d23838ee77e) - Google analytics now supports configuration for multiple locales ([@FrankHarland](https://github.com/FrankHarland))

- [#1754](https://github.com/graphcommerce-org/graphcommerce/pull/1754) [`f9cc9d45e`](https://github.com/graphcommerce-org/graphcommerce/commit/f9cc9d45ec500a719fd0b5f4c5673d23838ee77e) - New events added to Google analytics: purchase and add_to_cart (when adding and updating items) ([@FrankHarland](https://github.com/FrankHarland))

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1757](https://github.com/graphcommerce-org/graphcommerce/pull/1757) [`566beeee3`](https://github.com/graphcommerce-org/graphcommerce/commit/566beeee3b8300e836cb4cdb8102f1a239c281d7) - Make sure we can handle deeply nested items in a list ([@paales](https://github.com/paales))

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`85afcf4d0`](https://github.com/graphcommerce-org/graphcommerce/commit/85afcf4d011701f4b80e59e2b2b52a2e1f99a655) - Google Analytics now uses the new plugin system ([@paales](https://github.com/paales))

### Patch Changes

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

## 3.0.7

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 3.0.6

### Patch Changes

- Updated dependencies [[`a26a2d05e`](https://github.com/graphcommerce-org/graphcommerce/commit/a26a2d05eecabeeef70e4d69105343197ae092b7)]:
  - @graphcommerce/magento-product@4.8.4

## 3.0.5

### Patch Changes

- Updated dependencies [[`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e), [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65), [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9)]:
  - @graphcommerce/next-ui@4.29.3
  - @graphcommerce/magento-product@4.8.3

## 3.0.4

### Patch Changes

- Updated dependencies [[`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da)]:
  - @graphcommerce/magento-product@4.8.2
  - @graphcommerce/next-ui@4.29.2

## 3.0.3

### Patch Changes

- Updated dependencies [[`98d6a9cce`](https://github.com/graphcommerce-org/graphcommerce/commit/98d6a9cce1bb9514088be0af2736721b3edda467), [`aab6b4fa5`](https://github.com/graphcommerce-org/graphcommerce/commit/aab6b4fa5b4708003cfb5bf673a617dc5dbf3078)]:
  - @graphcommerce/next-ui@4.29.1
  - @graphcommerce/magento-product@4.8.1

## 3.0.2

### Patch Changes

- Updated dependencies [[`2b5451395`](https://github.com/graphcommerce-org/graphcommerce/commit/2b5451395dc1173de55d18d08968866e561f90ab), [`e76df6dc3`](https://github.com/graphcommerce-org/graphcommerce/commit/e76df6dc37c11c793a5d008ba36932d17dc23855), [`c4ed376e2`](https://github.com/graphcommerce-org/graphcommerce/commit/c4ed376e2c72b16b34704d7d1ca69c074de172ba), [`78d7d51cb`](https://github.com/graphcommerce-org/graphcommerce/commit/78d7d51cb1551601d3a4756cd1f2157a49ff93b9), [`0bd9ea582`](https://github.com/graphcommerce-org/graphcommerce/commit/0bd9ea58230dde79c5fe2cdb07e9860151460270)]:
  - @graphcommerce/magento-product@4.8.0
  - @graphcommerce/next-ui@4.29.0

## 3.0.1

### Patch Changes

- [#1676](https://github.com/graphcommerce-org/graphcommerce/pull/1676) [`55cabbbc5`](https://github.com/graphcommerce-org/graphcommerce/commit/55cabbbc517b35c5f909bd771e619a87614e4c97) Thanks [@paales](https://github.com/paales)! - Fix issue where gtag wouldn't exist

## 3.0.0

### Major Changes

- [#1655](https://github.com/graphcommerce-org/graphcommerce/pull/1655) [`3dde492ad`](https://github.com/graphcommerce-org/graphcommerce/commit/3dde492ad3a49d96481eeb7453fb305d0017b1a5) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Added Google Analytics support.

### Patch Changes

- Updated dependencies [[`9e630670f`](https://github.com/graphcommerce-org/graphcommerce/commit/9e630670ff6c952ab7b938d890b5509804985cf3), [`2e9fa5984`](https://github.com/graphcommerce-org/graphcommerce/commit/2e9fa5984a07ff14fc1b3a4f62189a26e8e3ecdd), [`adf13069a`](https://github.com/graphcommerce-org/graphcommerce/commit/adf13069af6460c960276b402237371c12fc6dec), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6)]:
  - @graphcommerce/next-ui@4.28.1
  - @graphcommerce/magento-product@4.7.3

## 2.0.7

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 2.0.6

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 2.0.5

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 2.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

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

# [1.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.4...@graphcommerce/googleanalytics@1.2.0) (2021-12-21)

### Features

- **googleanalytics:** moved to gtag ([c586a8f](https://github.com/ho-nl/m2-pwa/commit/c586a8f66547cf7c332113e991a257181ce8d338))

## [1.1.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.3...@graphcommerce/googleanalytics@1.1.4) (2021-12-20)

### Bug Fixes

- make sure analytics only tracks once on page load ([94def43](https://github.com/ho-nl/m2-pwa/commit/94def43db7075b6b039696612547c6b6ff7c7c6e))
- make sure we're not loading gogole properties when keys are not given ([8636715](https://github.com/ho-nl/m2-pwa/commit/8636715d61985e0919208ffb64354c3ebb43ed01))

## [1.1.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.1...@graphcommerce/googleanalytics@1.1.2) (2021-12-17)

### Bug Fixes

- pageview with analytics not registered ([7cdb68d](https://github.com/ho-nl/m2-pwa/commit/7cdb68d9770a00044fa5a1f143fd05701ea72d59))

## [1.1.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.0...@graphcommerce/googleanalytics@1.1.1) (2021-12-17)

### Bug Fixes

- **googleanalytics:** make sure ga is defined ([787dd9f](https://github.com/ho-nl/m2-pwa/commit/787dd9f6945469e36ebf627213fdb5eefb8146cd))

# 1.1.0 (2021-12-17)

### Features

- **googleanalytics:** created pacakge to support Google Analytics ([308b6df](https://github.com/ho-nl/m2-pwa/commit/308b6df1f216d2bc726c770a9ead039bd114a995))
