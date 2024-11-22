# @graphcommerce/demo-magento-graphcommerce

## 9.0.0-canary.104

## 9.0.0-canary.103

## 9.0.0-canary.60

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 8.1.0-canary.45

### Patch Changes

- [#2216](https://github.com/graphcommerce-org/graphcommerce/pull/2216) [`3b648fd`](https://github.com/graphcommerce-org/graphcommerce/commit/3b648fd310e43bf7a03c3e446e97426d2f5bbfb2) - Remove large demo item, as it doesn't properly work and isn't as pretty as it can be ([@paales](https://github.com/paales))

## 8.0.0

### Patch Changes

- [#2155](https://github.com/graphcommerce-org/graphcommerce/pull/2155) [`6a34c4a`](https://github.com/graphcommerce-org/graphcommerce/commit/6a34c4a870948ffb31f90b678e7e108066cb09a9) - Added AddProductsToCartForm context provider to the recently viewed products demo to fix a bug surrounding a form that was null. ([@Jessevdpoel](https://github.com/Jessevdpoel))

- [`38ec023`](https://github.com/graphcommerce-org/graphcommerce/commit/38ec0237306dd77ed7882b3b99dafa94e817dc67) - Make sure the DemoRecentlyViewedProducts doesn't render without any items ([@paales](https://github.com/paales))

## 7.0.0

### Major Changes

- [`e55d8c390`](https://github.com/graphcommerce-org/graphcommerce/commit/e55d8c390d90b4bb7bab11c6a99027ac72bd7e3e) - Created a new sidebar layout system, can be configured with productFiltersLayout in the graphcommerce.config.js ([@paales](https://github.com/paales))

### Patch Changes

- [#1947](https://github.com/graphcommerce-org/graphcommerce/pull/1947) [`f105d1401`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d1401c41087af98023e58371c4a5a3cb181b) - Demo content for RowLinks order would be wrong ([@paales](https://github.com/paales))

- [#1959](https://github.com/graphcommerce-org/graphcommerce/pull/1959) [`d0809b132`](https://github.com/graphcommerce-org/graphcommerce/commit/d0809b132a0e4cbdfeb86164f6c16a89ebecd987) - Added support for default values in the Config.graphqls files for the documentation ([@JoshuaS98](https://github.com/JoshuaS98))

## 6.0.0

### Major Changes

- [#1832](https://github.com/graphcommerce-org/graphcommerce/pull/1832) [`26d4243d5`](https://github.com/graphcommerce-org/graphcommerce/commit/26d4243d5b63d604e5a36386d9b01914db5f2918) - Added a new RowLink component with variants: Inline, ImageLabelSwiper, LogoSwiper and Usps. Updated the demo to show off these new components. ([@ErwinOtten](https://github.com/ErwinOtten))

### Minor Changes

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`7dc3e036c`](https://github.com/graphcommerce-org/graphcommerce/commit/7dc3e036c776224aa184e03cc957dcb8d3faa55c) - Added ability to have local plugins and added example plugin in the plugins directory ([@paales](https://github.com/paales))

### Patch Changes

- [#1821](https://github.com/graphcommerce-org/graphcommerce/pull/1821) [`1abc50a21`](https://github.com/graphcommerce-org/graphcommerce/commit/1abc50a21103270fad04e4a9ea892ee1e75233e9) - Upgrade packages to latest version ([@paales](https://github.com/paales))

- [#1846](https://github.com/graphcommerce-org/graphcommerce/pull/1846) [`83e79f160`](https://github.com/graphcommerce-org/graphcommerce/commit/83e79f1600983c76b959ca1b2ceefd56aac80a7a) - Two Hygraph row components are now deprecated: RowButtonLinkList and RowContentLinks, you should use RowLinks instead. ([@ErwinOtten](https://github.com/ErwinOtten))

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

### Patch Changes

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`bd3a30438`](https://github.com/graphcommerce-org/graphcommerce/commit/bd3a30438cf6b69cd37a191406c8190a20e572cc) - Created directive @env(if: String!) on FRAGMENT_DEFINITION to conditionally include a fragment ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`6171ad02c`](https://github.com/graphcommerce-org/graphcommerce/commit/6171ad02c19782b1e1f0eb00ea25ea6b764250b5) - Added topological sorting to plugins and added ifEnv export to plugins to conditionally load plugins ([@paales](https://github.com/paales))
