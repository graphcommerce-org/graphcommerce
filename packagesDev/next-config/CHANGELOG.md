# Change Log

## 6.1.0

### Minor Changes

- [#1874](https://github.com/graphcommerce-org/graphcommerce/pull/1874) [`2a60491c2`](https://github.com/graphcommerce-org/graphcommerce/commit/2a60491c23a9cd0bfd79296d29f6c9ee31faada5) - Big Magento performance improvements; Magento couldn't respond with any cached Varnish responses because there was an empty authorization header sent with each request. ([@paales](https://github.com/paales))

### Patch Changes

- [#1876](https://github.com/graphcommerce-org/graphcommerce/pull/1876) [`8dffc59c0`](https://github.com/graphcommerce-org/graphcommerce/commit/8dffc59c04bf6f2a6000b73db13592e10afd936c) - Added an configuration `wishlistShowFeedbackMessage` to show a feedback message when a product is added to the wishlist. ([@paales](https://github.com/paales))

- [#1872](https://github.com/graphcommerce-org/graphcommerce/pull/1872) [`05522796f`](https://github.com/graphcommerce-org/graphcommerce/commit/05522796f3f132db50e7b4c26089740a12a9153a) - Fix issue where a deeper plugin from the root of the project doesn't have a correct relative path ([@paales](https://github.com/paales))

## 6.0.2-canary.22

## 6.0.2-canary.21

## 6.0.2-canary.20

## 6.0.2-canary.19

## 6.0.2-canary.18

## 6.0.2-canary.17

## 6.0.2-canary.16

## 6.0.2-canary.15

## 6.0.2-canary.14

## 6.0.2-canary.13

## 6.0.2-canary.12

## 6.0.2-canary.11

## 6.0.2-canary.10

## 6.0.2-canary.9

## 6.0.2-canary.8

## 6.0.2-canary.7

### Patch Changes

- [#1876](https://github.com/graphcommerce-org/graphcommerce/pull/1876) [`8dffc59c0`](https://github.com/graphcommerce-org/graphcommerce/commit/8dffc59c04bf6f2a6000b73db13592e10afd936c) - Added an configuration to the wishlist: `wishlistShowFeedbackMessage` to show a feedback message when a product is added to the wishlist. ([@paales](https://github.com/paales))

## 6.0.2-canary.6

## 6.0.2-canary.5

## 6.0.2-canary.4

### Patch Changes

- [#1874](https://github.com/graphcommerce-org/graphcommerce/pull/1874) [`2a60491c2`](https://github.com/graphcommerce-org/graphcommerce/commit/2a60491c23a9cd0bfd79296d29f6c9ee31faada5) - Magento couldn't respond with any cached Varnish responses because there was an empty authorization header sent with each request. ([@paales](https://github.com/paales))

## 6.0.2-canary.3

### Patch Changes

- [#1872](https://github.com/graphcommerce-org/graphcommerce/pull/1872) [`05522796f`](https://github.com/graphcommerce-org/graphcommerce/commit/05522796f3f132db50e7b4c26089740a12a9153a) - Fix issue where a deeper plugin from the root of the project doesn't have a correct relative path ([@paales](https://github.com/paales))

## 6.0.2-canary.2

## 6.0.2-canary.1

## 6.0.2-canary.0

## 6.0.1

### Patch Changes

- [#1863](https://github.com/graphcommerce-org/graphcommerce/pull/1863) [`ce6c990b2`](https://github.com/graphcommerce-org/graphcommerce/commit/ce6c990b25286bed393470a818f8daab2bb51457) - Solve issue where intercepters coudn’t be properly deleted because it was already deleted, fixe ([@paales](https://github.com/paales))

## 6.0.1-canary.7

## 6.0.1-canary.6

## 6.0.1-canary.5

### Patch Changes

- [#1863](https://github.com/graphcommerce-org/graphcommerce/pull/1863) [`ce6c990b2`](https://github.com/graphcommerce-org/graphcommerce/commit/ce6c990b25286bed393470a818f8daab2bb51457) - Solve issue where intercepters coudn’t be properly deleted because it was already deleted, fixe ([@paales](https://github.com/paales))

## 6.0.1-canary.4

## 6.0.1-canary.3

## 6.0.1-canary.2

## 6.0.1-canary.1

## 6.0.1-canary.0

## 6.0.0

### Major Changes

- [#1766](https://github.com/graphcommerce-org/graphcommerce/pull/1766) [`e34169ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/e34169ee2e0fdc052ff589ceca0bc67557584c1f) - Upgraded to Next.js 13

  - NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
  - NextLink automatically adds `target="_blank"` when the href is external.
  - NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`. ([@paales](https://github.com/paales))

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b76679204`](https://github.com/graphcommerce-org/graphcommerce/commit/b766792049e1e6ebe45671c0b36e78746ef159e2) - Created a completely new [GraphCommerce config system](https://www.graphcommerce.org/docs/framework/config) to allow for greater confiugration options and rely less on a .env file to configuration.

  - GraphCommerce can be configured in the graphcommerce.config.js
  - The configuration is automatically validated on startup.
  - All configuration values can be overwritten by environment variables. ([@paales](https://github.com/paales))

### Minor Changes

- [#1828](https://github.com/graphcommerce-org/graphcommerce/pull/1828) [`3df85faf1`](https://github.com/graphcommerce-org/graphcommerce/commit/3df85faf189b95e2c7d9c3fc756474fcafb1c8b4) - Added a new `productRoute` configuration to create freedom in the actual product route used (default: /p/). Simplified redirects from legacy product routes to new routes by creating redirects. ([@paales](https://github.com/paales))

- [#1810](https://github.com/graphcommerce-org/graphcommerce/pull/1810) [`543c5d5b2`](https://github.com/graphcommerce-org/graphcommerce/commit/543c5d5b2b6f29c1f6a0a405524d4cc86f399596) - Added `limitSsg: Boolean` configuration option to limit the getStaticPaths generation during build. This is useful to make quick deployments on preview environments. ([@paales](https://github.com/paales))

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`7dc3e036c`](https://github.com/graphcommerce-org/graphcommerce/commit/7dc3e036c776224aa184e03cc957dcb8d3faa55c) - Added ability to have local plugins and added example plugin in the plugins directory ([@paales](https://github.com/paales))

### Patch Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`fff2420c6`](https://github.com/graphcommerce-org/graphcommerce/commit/fff2420c62472edfd2c3d6eba1012dbf48efa3db) - Added `debug.webpackCircularDependencyPlugin`, `debug.webpackDuplicatesPlugin` and `debug.pluginStatus` to be able to run some debugging commands. ([@paales](https://github.com/paales))

- [#1844](https://github.com/graphcommerce-org/graphcommerce/pull/1844) [`929cffafb`](https://github.com/graphcommerce-org/graphcommerce/commit/929cffafbc8b2e57433b6448c95234fb057880b1) - Plugins now are correctly sorted and local plugins will always be closest to the original component. ([@paales](https://github.com/paales))

- [#1831](https://github.com/graphcommerce-org/graphcommerce/pull/1831) [`4d4a3464c`](https://github.com/graphcommerce-org/graphcommerce/commit/4d4a3464c807e34a36952d01e63a5c556176b0b6) - Removed of next-transpile-modules and use transpilePackages option of nextjs. ([@paales](https://github.com/paales))

## 6.0.0-canary.54

## 6.0.0-canary.53

## 6.0.0-canary.52

## 6.0.0-canary.51

## 6.0.0-canary.50

## 6.0.0-canary.49

## 6.0.0-canary.48

## 6.0.0-canary.47

## 6.0.0-canary.46

### Patch Changes

- [#1844](https://github.com/graphcommerce-org/graphcommerce/pull/1844) [`929cffafb`](https://github.com/graphcommerce-org/graphcommerce/commit/929cffafbc8b2e57433b6448c95234fb057880b1) - Plugins were incorrectly sorted and local plugins didn't get preference ([@paales](https://github.com/paales))

## 6.0.0-canary.45

## 6.0.0-canary.44

### Patch Changes

- [#1842](https://github.com/graphcommerce-org/graphcommerce/pull/1842) [`7b67d84bd`](https://github.com/graphcommerce-org/graphcommerce/commit/7b67d84bd269c3fc91afbd69f6683c5d12808d36) - Renamed i18n to storefront in configuration ([@paales](https://github.com/paales))

## 6.0.0-canary.43

## 6.0.0-canary.42

## 6.0.0-canary.41

### Patch Changes

- [#1839](https://github.com/graphcommerce-org/graphcommerce/pull/1839) [`e4a3f5e98`](https://github.com/graphcommerce-org/graphcommerce/commit/e4a3f5e986287b78c3e048d8a33611c61070b79e) - Make sure the configuration is validated before executing ([@paales](https://github.com/paales))

- [#1839](https://github.com/graphcommerce-org/graphcommerce/pull/1839) [`8eb310409`](https://github.com/graphcommerce-org/graphcommerce/commit/8eb3104098749a6b08d2affb6cdc8a7e6698866f) - Use graphCommerce._ instead of import.meta.graphCommerce._ in .meshrc.yml ([@paales](https://github.com/paales))

## 6.0.0-canary.40

## 6.0.0-canary.39

## 6.0.0-canary.38

## 6.0.0-canary.37

## 6.0.0-canary.36

### Minor Changes

- [#1833](https://github.com/graphcommerce-org/graphcommerce/pull/1833) [`7dc3e036c`](https://github.com/graphcommerce-org/graphcommerce/commit/7dc3e036c776224aa184e03cc957dcb8d3faa55c) - Added ability to have local plugins and added example plugin in the plugins directory ([@paales](https://github.com/paales))

## 6.0.0-canary.35

## 6.0.0-canary.34

## 6.0.0-canary.33

### Patch Changes

- [#1831](https://github.com/graphcommerce-org/graphcommerce/pull/1831) [`4d4a3464c`](https://github.com/graphcommerce-org/graphcommerce/commit/4d4a3464c807e34a36952d01e63a5c556176b0b6) - Make sure packages are transpiled in node_modules with nextjs’ transpilePackages option ([@paales](https://github.com/paales))

## 6.0.0-canary.32

## 6.0.0-canary.31

## 6.0.0-canary.30

## 6.0.0-canary.29

### Minor Changes

- [#1828](https://github.com/graphcommerce-org/graphcommerce/pull/1828) [`3df85faf1`](https://github.com/graphcommerce-org/graphcommerce/commit/3df85faf189b95e2c7d9c3fc756474fcafb1c8b4) - Added new `productRoute` configuration to create freedom in the actual product route used (default: /p/). Simplified redirects from legacy product routes to new routes by creating redirects. ([@paales](https://github.com/paales))

## 6.0.0-canary.28

## 6.0.0-canary.27

## 6.0.0-canary.26

## 6.0.0-canary.25

## 6.0.0-canary.24

## 6.0.0-canary.23

### Minor Changes

- [#1810](https://github.com/graphcommerce-org/graphcommerce/pull/1810) [`543c5d5b2`](https://github.com/graphcommerce-org/graphcommerce/commit/543c5d5b2b6f29c1f6a0a405524d4cc86f399596) - Added `limitSsg: Boolean` configuration option to limit the getStaticPaths generation during build. This is useful to make quick deployments on preview environments. ([@paales](https://github.com/paales))

## 6.0.0-canary.22

## 6.0.0-canary.21

## 6.0.0-canary.20

### Minor Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`b76679204`](https://github.com/graphcommerce-org/graphcommerce/commit/b766792049e1e6ebe45671c0b36e78746ef159e2) - Added a new graphcommerce.config.ts which can be accessed with import.mete.graphCommerce.myConfig ([@paales](https://github.com/paales))

### Patch Changes

- [#1786](https://github.com/graphcommerce-org/graphcommerce/pull/1786) [`fff2420c6`](https://github.com/graphcommerce-org/graphcommerce/commit/fff2420c62472edfd2c3d6eba1012dbf48efa3db) - Added configuration for webpackDuplicatesPlugin ([@paales](https://github.com/paales))

## 5.2.0-canary.19

## 5.2.0-canary.18

## 5.2.0-canary.17

## 5.2.0-canary.16

## 5.2.0-canary.15

## 5.2.0-canary.14

## 5.2.0-canary.13

## 5.2.0-canary.12

## 5.2.0-canary.11

## 5.2.0-canary.10

## 5.2.0-canary.9

## 5.2.0-canary.8

## 5.2.0-canary.7

## 5.2.0-canary.6

## 5.2.0-canary.5

## 5.2.0-canary.4

## 5.2.0-canary.3

### Minor Changes

- [#1766](https://github.com/graphcommerce-org/graphcommerce/pull/1766) [`e34169ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/e34169ee2e0fdc052ff589ceca0bc67557584c1f) - Upgraded to Next.js 13

  - NextLink integrates the next/link functionality with @mui/material's Link and ButtonBase (and all it's derivatives) components.
  - NextLink automatically adds `target="_blank"` when the href is external.
  - NextLink makes all relative href absolute. `href="my-page"` will be rendered as `href="/my-page"`.

  Upgrade instructions: https://www.graphcommerce.org/docs/framework/links#upgrading-from-nextjs-12 ([@paales](https://github.com/paales))

## 5.2.0-canary.2

## 5.2.0-canary.1

## 5.2.0-canary.0

## 5.1.1

## 5.1.1-canary.1

## 5.1.1-canary.0

### Patch Changes

- [#1762](https://github.com/graphcommerce-org/graphcommerce/pull/1762) [`0aab0bcc2`](https://github.com/graphcommerce-org/graphcommerce/commit/0aab0bcc2048793f43a76bf981ca18d9f3ccaf16) - yarn can not completele successfully when runnin in a monorepo setup if codegen hasn’t ran ([@paales](https://github.com/paales))

## 5.1.0

### Patch Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`225a69dc9`](https://github.com/graphcommerce-org/graphcommerce/commit/225a69dc9eb76d85adee1c6ea8c4eff16a5fed63) - When a plugin doesn't target a file anymore, it will now cleanup the existing interceptor file. ([@paales](https://github.com/paales))

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`4759c1781`](https://github.com/graphcommerce-org/graphcommerce/commit/4759c1781ebe94c18f557e2ba189000580a05692) - Interceptors are regenerated when a plugin contains a faulty configuration (happens a lot when building a plugin). ([@paales](https://github.com/paales))

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`2a859970d`](https://github.com/graphcommerce-org/graphcommerce/commit/2a859970de34ad768a0ba54f50d53ad17823cc15) - Make sure the interceptors aren't cleaned up constantly ([@github-actions](https://github.com/apps/github-actions))

## 5.1.0-canary.11

## 5.1.0-canary.10

### Patch Changes

- [#1760](https://github.com/graphcommerce-org/graphcommerce/pull/1760) [`8badc8550`](https://github.com/graphcommerce-org/graphcommerce/commit/8badc8550c402ac7b80c8d3238d313550c28a055) - Updated dependencies ([@paales](https://github.com/paales))

## 5.1.0-canary.9

## 5.1.0-canary.8

## 5.1.0-canary.7

## 5.1.0-canary.6

## 5.1.0-canary.5

### Patch Changes

- [`2a859970d`](https://github.com/graphcommerce-org/graphcommerce/commit/2a859970de34ad768a0ba54f50d53ad17823cc15) - Make sure the interceptors aren't cleaned up constantly ([@paales](https://github.com/paales))

## 5.1.0-canary.4

### Patch Changes

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`225a69dc9`](https://github.com/graphcommerce-org/graphcommerce/commit/225a69dc9eb76d85adee1c6ea8c4eff16a5fed63) - When a plugin doesn't target a file anymore, it will now cleanup the existing interceptor file. ([@paales](https://github.com/paales))

- [#1755](https://github.com/graphcommerce-org/graphcommerce/pull/1755) [`4759c1781`](https://github.com/graphcommerce-org/graphcommerce/commit/4759c1781ebe94c18f557e2ba189000580a05692) - Interceptors are regenerated when a plugin contains a faulty configuration (happens a lot when building a plugin). ([@paales](https://github.com/paales))

## 5.1.0-canary.3

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.2

## 5.1.0-canary.1

## 5.1.0-canary.0

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`4f85e4878`](https://github.com/graphcommerce-org/graphcommerce/commit/4f85e4878e4ad0dd528d60ad35826da0677059a9) - Add the ability to specificy plugins on the package name (e.g. `@graphcommerce/magento-cart-payment-method`) ([@paales](https://github.com/paales))

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`16abc9995`](https://github.com/graphcommerce-org/graphcommerce/commit/16abc9995377f5c00032674de0a1ea3ebad88c4c) - Introducing a new **Plugin system for GraphCommerce** which allows you to extend GraphCommerce in a plug-and-play manner. [Read the documentation to learn more](https://github.com/graphcommerce-org/graphcommerce/blob/main/docs/framework/plugins.md) ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`6171ad02c`](https://github.com/graphcommerce-org/graphcommerce/commit/6171ad02c19782b1e1f0eb00ea25ea6b764250b5) - Added topological sorting to plugins and added ifEnv export to plugins to conditionally load plugins ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`d6abe2646`](https://github.com/graphcommerce-org/graphcommerce/commit/d6abe26461d92e6f6c39da1cb7e6ac896bb9475f) - Added comments to generated interceptor ([@paales](https://github.com/paales))

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`fdb33b4e6`](https://github.com/graphcommerce-org/graphcommerce/commit/fdb33b4e6cace84a370aa000bf86c9c3c377aaae) - Make sure the root package is always included even if it doesn't include graphcommerce in the name ([@github-actions](https://github.com/apps/github-actions))

## 5.0.0-canary.14

## 5.0.0-canary.9

### Major Changes

- [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@paales](https://github.com/paales))

## 4.31.0-canary.8

## 4.31.0-canary.7

### Patch Changes

- [`fdb33b4e6`](https://github.com/graphcommerce-org/graphcommerce/commit/fdb33b4e6cace84a370aa000bf86c9c3c377aaae) - Make sure the root package is always included even if it doesn't include graphcommerce in the name ([@paales](https://github.com/paales))

## 4.31.0-canary.6

## 4.31.0-canary.5

### Minor Changes

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`6171ad02c`](https://github.com/graphcommerce-org/graphcommerce/commit/6171ad02c19782b1e1f0eb00ea25ea6b764250b5) - Added topological sorting to plugins and added ifEnv export to plugins to conditionally load plugins ([@paales](https://github.com/paales))

## 4.31.0-canary.4

## 4.31.0-canary.3

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`d6abe2646`](https://github.com/graphcommerce-org/graphcommerce/commit/d6abe26461d92e6f6c39da1cb7e6ac896bb9475f) - Added comments to generated interceptor ([@paales](https://github.com/paales))

## 4.31.0-canary.2

### Minor Changes

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`4f85e4878`](https://github.com/graphcommerce-org/graphcommerce/commit/4f85e4878e4ad0dd528d60ad35826da0677059a9) - Add the ability to specificy plugins on the package name (e.g. `@graphcommerce/magento-cart-payment-method`) ([@paales](https://github.com/paales))

## 4.31.0-canary.1

### Minor Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`16abc9995`](https://github.com/graphcommerce-org/graphcommerce/commit/16abc9995377f5c00032674de0a1ea3ebad88c4c) - Introducing a new **Plugin system for GraphCommerce** which allows you to extend GraphCommerce in a plug-and-play manner. [Read the documentation to learn more](https://github.com/graphcommerce-org/graphcommerce/blob/main/docs/framework/plugins.md) ([@paales](https://github.com/paales))

## 4.31.0-canary.0

## 4.30.2

## 4.30.1

### Patch Changes

- [#1724](https://github.com/graphcommerce-org/graphcommerce/pull/1724) [`0c54f0b78`](https://github.com/graphcommerce-org/graphcommerce/commit/0c54f0b7828d78df373a96dc6d6dcd1ee108704f) Thanks [@paales](https://github.com/paales)! - Fix issue where the build version of next-config wasn't available

## 4.30.0

### Minor Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`6c1c69ca4`](https://github.com/graphcommerce-org/graphcommerce/commit/6c1c69ca45ea1c8737cc7dcdc341fe5d825ed380) Thanks [@paales](https://github.com/paales)! - Refactor next-config to also use the new resolveDependenciesSync by exposing withGraphCommerce

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.30.0-canary.1

### Patch Changes

- [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.30.0-canary.0

### Minor Changes

- [#1613](https://github.com/graphcommerce-org/graphcommerce/pull/1613) [`6c1c69ca4`](https://github.com/graphcommerce-org/graphcommerce/commit/6c1c69ca45ea1c8737cc7dcdc341fe5d825ed380) Thanks [@paales](https://github.com/paales)! - Refactor next-config to also use the new resolveDependenciesSync by exposing withGraphCommerce

## 3.2.0

### Minor Changes

- [#1600](https://github.com/graphcommerce-org/graphcommerce/pull/1600) [`7949c1ce1`](https://github.com/graphcommerce-org/graphcommerce/commit/7949c1ce1fd9babba5f7a440e2bb18e71f7ea515) Thanks [@paales](https://github.com/paales)! - Allow for multiple packages to be watched by webpack at the same time

## 3.1.6

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

## 3.1.5

### Patch Changes

- [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

## 3.1.4

### Patch Changes

- [#1426](https://github.com/graphcommerce-org/graphcommerce/pull/1426) [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2) Thanks [@paales](https://github.com/paales)! - Upgrade packages

## 3.1.3

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

## 3.1.2

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 3.1.1

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

## 3.1.0

### Minor Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`47a03c6c7`](https://github.com/graphcommerce-org/graphcommerce/commit/47a03c6c764cb1f544d3de3af52456608694a9d7) Thanks [@paales](https://github.com/paales)! - Files in node_modules/@graphcommerce will now also be watched and won’t be cached

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 3.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgraded dependencies to the latest version

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.109.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.108.0...@graphcommerce/next-config@2.109.0) (2021-11-12)

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

# [2.108.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.107.3...@graphcommerce/next-config@2.108.0) (2021-11-09)

### Features

- **next-config:** support for .po files to be imported ([79b64ce](https://github.com/ho-nl/m2-pwa/commit/79b64ce9b444fcf620279d9a8e5d253b8e9cfa84))

# [2.107.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.106.1...@graphcommerce/next-config@2.107.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

# [2.106.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.105.1...@graphcommerce/next-config@2.106.0) (2021-10-20)

### Features

- **next-config:** support topLevelAwait ([3cb4f90](https://github.com/ho-nl/m2-pwa/commit/3cb4f90ac3af797f5fcba888dfd28aa2b76480b8))

## [2.105.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.105.0...@graphcommerce/next-config@2.105.1) (2021-10-19)

### Bug Fixes

- **next-config:** make sure webpack is available ([46edb3e](https://github.com/ho-nl/m2-pwa/commit/46edb3e6fd1b716d7d9dbe59cb1530375d24c228))

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.7...@graphcommerce/next-config@2.105.0) (2021-10-19)

### Bug Fixes

- **next-config:** move the @apollo/client **DEV** env to next-config ([fb1df3f](https://github.com/ho-nl/m2-pwa/commit/fb1df3fe4edbf769afb4149c7beced70bb948be5))

### Features

- **mesh:** move to a default .meshrc.yml format instead of the json file ([d9a30a7](https://github.com/ho-nl/m2-pwa/commit/d9a30a78baed2b85b77bbd80e94a6f047e2255b6))

## [2.104.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.3...@graphcommerce/next-config@2.104.4) (2021-10-07)

### Bug Fixes

- replace **DEV** with proper variable for optimizing the bundle size ([9b03209](https://github.com/ho-nl/m2-pwa/commit/9b032095f618846d132c00b8dc14fbb1b09c6ed8))

## [2.104.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.2...@graphcommerce/next-config@2.104.3) (2021-09-30)

### Bug Fixes

- .next folder doesn't always exist on vercel ([5f8f1a7](https://github.com/ho-nl/m2-pwa/commit/5f8f1a7c2c6690be113adfe2fef662c63781e91f))

## [2.104.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.1...@graphcommerce/next-config@2.104.2) (2021-09-29)

### Bug Fixes

- cache dependencylist ([257da86](https://github.com/ho-nl/m2-pwa/commit/257da860c22a7134896e99e2fcf9f67c0ce99363))

## [2.104.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.104.0...@graphcommerce/next-config@2.104.1) (2021-09-28)

### Bug Fixes

- do not build on install ([254e2a6](https://github.com/ho-nl/m2-pwa/commit/254e2a6f4b2a7e81f46466a0abe06ae2f3a79575))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.103.0...@graphcommerce/next-config@2.104.0) (2021-09-28)

### Features

- created withYarn1Scopes functionality so we don't rely on actual workspaces ([7e491ca](https://github.com/ho-nl/m2-pwa/commit/7e491ca2276028a8587f6cd88b98ee451755c3d0))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.3...@graphcommerce/next-config@2.103.0) (2021-09-28)

### Bug Fixes

- withYarn1Workspaces is not a function ([a095bc9](https://github.com/ho-nl/m2-pwa/commit/a095bc9f0011fbe9180d0e1718f1b41e89a5f6d9))

### Features

- add postinstall commands to run properly on deploy ([d512ee3](https://github.com/ho-nl/m2-pwa/commit/d512ee3ba5c3a9573651ec5333595fe2f1aa141c))

## [2.102.3](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.2...@graphcommerce/next-config@2.102.3) (2021-09-27)

### Bug Fixes

- build packages before releasing ([c4761cf](https://github.com/ho-nl/m2-pwa/commit/c4761cf6d1810c140fd56f6eac8fca922f8c0edc))

## [2.102.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.2) (2021-09-27)

### Bug Fixes

- add warnings to next.config.js when .env variables are missing ([d9dffec](https://github.com/ho-nl/m2-pwa/commit/d9dffec8ebc9cb1c70ca5591cad5e42c9bbe30e6))

## [2.102.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.102.0...@graphcommerce/next-config@2.102.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/next-config

# 2.102.0 (2021-09-27)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- **next-config:** another shot at fixing next-config ([a4afe11](https://github.com/ho-nl/m2-pwa/commit/a4afe112aa1308c10bb407d5e3eebf1f239d789c))
- **next-config:** automatically resolve the workspace dependencies ([4d739ec](https://github.com/ho-nl/m2-pwa/commit/4d739ec969591f96392f99e476016c6ad1d092cb))
- playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

### Features

- **framer-sheet:** created separate package that can be implemented ([69cc8ce](https://github.com/ho-nl/m2-pwa/commit/69cc8ce3237125335524728a70f4dae050032108))
- **next-config:** introduced package to streamline the setup of new examples ([b8a3958](https://github.com/ho-nl/m2-pwa/commit/b8a39584e5b529fcaa22db67d3f986b91ae683ad))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.101.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.101.0...@graphcommerce/next-config@2.101.1) (2021-09-01)

### Bug Fixes

- playwright can't find the place order button ([b1fda5b](https://github.com/ho-nl/m2-pwa/commit/b1fda5b3e403dad621aba8ed895427f2166bc985))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.10...@graphcommerce/next-config@2.101.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.100.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/next-config@2.100.9...@graphcommerce/next-config@2.100.10) (2021-08-09)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
