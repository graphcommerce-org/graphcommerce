# @graphcommerce/demo-magento-graphcommerce

## 10.0.0-canary.69

## 10.0.0-canary.68

## 10.0.0-canary.67

## 10.0.0-canary.66

## 10.0.0-canary.65

## 10.0.0-canary.64

## 10.0.0-canary.63

## 10.0.0-canary.62

## 10.0.0-canary.61

## 10.0.0-canary.60

## 10.0.0-canary.59

## 10.0.0-canary.58

## 10.0.0-canary.57

## 10.0.0-canary.56

### Major Changes

- [#2546](https://github.com/graphcommerce-org/graphcommerce/pull/2546) [`ed9332a`](https://github.com/graphcommerce-org/graphcommerce/commit/ed9332a7f78966d932041d9a7725641edc92b28d) - ## GraphCommerce 10 - Turbopack Support

  This major release brings full Turbopack compatibility, dramatically improving development speed.

  ### 🚀 Turbopack-Compatible Interceptor System

  The entire plugin/interceptor system has been rewritten to work with Turbopack:

  - **No more Webpack plugins** - Removed `InterceptorPlugin` webpack plugin entirely
  - **File-based interception** - Original files are moved to `.original.tsx` and replaced with interceptor content
  - **Direct imports** - Interceptors import from `.original` files instead of embedding source
  - **New CLI commands**:
    - `graphcommerce codegen-interceptors` - Generate interceptor files
    - `graphcommerce cleanup-interceptors` - Reset interceptor system, restore original files
  - **Stable file hashing** - Deterministic interceptor generation for better caching

  ### ⚙️ Treeshakable Configuration System

  Replaced Webpack `DefinePlugin`-based `import.meta.graphCommerce` with a new generated configuration system:

  - **New `codegen-config-values` command** - Generates TypeScript files with precise typing
  - **Schema-driven** - Dynamically introspects Zod schemas to determine all available properties
  - **Fully treeshakable** - Unused config values are eliminated from the bundle
  - **Type-safe** - Uses `Get<GraphCommerceConfig, 'path'>` for nested property access
  - **Separate files for nested objects** - Optimal treeshaking for complex configurations

  ### 🔧 withGraphCommerce Changes

  - **Removed** `InterceptorPlugin` - No longer needed with file-based interception
  - **Removed** `DefinePlugin` for `import.meta.graphCommerce` - Replaced with generated config
  - **Removed** `@mui/*` alias rewrites - No longer required
  - **Added** Turbopack loader rules for `.yaml`, `.yml`, and `.po` files
  - **Added** `serverExternalPackages` for all `@whatwg-node/*` packages
  - **Added** `optimizePackageImports` for better bundle optimization
  - **Added** `images.qualities: [52, 75]` for Next.js image optimization

  ### 📦 Lingui Configuration

  - **Renamed** `lingui.config.js` → `lingui.config.ts` with TypeScript support
  - **Updated** `@graphcommerce/lingui-next/config` to TypeScript with proper exports
  - **Simplified** formatter options

  ### ⚛️ React 19 & Next.js 16 Compatibility

  - Updated `RefObject<T>` types for React 19 (now includes `null` by default)
  - Replaced deprecated `React.VFC` with `React.FC`
  - Fixed `useRef` calls to require explicit initial values
  - Updated `MutableRefObject` usage in `framer-scroller`

  ### 📋 ESLint 9 Flat Config

  - Migrated from legacy `.eslintrc` to new flat config format (`eslint.config.mjs`)
  - Updated `@typescript-eslint/*` packages to v8
  - Fixed AST selector for `SxProps` rule (`typeParameters` → `typeArguments`)

  ### 🔄 Apollo Client

  - Fixed deprecated `name` option → `clientAwareness: { name: 'ssr' }`
  - Updated error handling types to accept `ApolloError | null | undefined`

  ### ⚠️ Breaking Changes

  - **Node.js 24.x not supported** - Restricted to `>=20 <24.0.0` due to [nodejs/undici#4290](https://github.com/nodejs/undici/issues/4290)
  - **Interceptor files changed** - Original components now at `.original.tsx`
  - **Config access changed** - Use generated config values instead of `import.meta.graphCommerce`
  - **ESLint config format** - Must use flat config (`eslint.config.mjs`)
  - **Lingui config** - Rename `lingui.config.js` to `lingui.config.ts`

  ### 🗑️ Removed

  - `InterceptorPlugin` webpack plugin
  - `configToImportMeta` utility
  - Webpack `DefinePlugin` usage for config
  - `@mui/*` modern alias rewrites
  - Debug plugins (`CircularDependencyPlugin`, `DuplicatesPlugin`) ([@paales](https://github.com/paales))

## 9.1.0-canary.55

## 9.1.0-canary.54

## 9.1.0-canary.53

## 9.1.0-canary.52

## 9.1.0-canary.51

## 9.1.0-canary.50

## 9.1.0-canary.49

## 9.1.0-canary.48

## 9.1.0-canary.47

## 9.1.0-canary.46

## 9.1.0-canary.45

## 9.1.0-canary.44

## 9.1.0-canary.43

## 9.1.0-canary.42

## 9.1.0-canary.41

## 9.1.0-canary.40

## 9.1.0-canary.39

## 9.1.0-canary.38

## 9.1.0-canary.37

## 9.1.0-canary.36

## 9.1.0-canary.35

## 9.1.0-canary.34

## 9.1.0-canary.33

## 9.1.0-canary.32

## 9.1.0-canary.31

## 9.1.0-canary.30

## 9.1.0-canary.29

## 9.1.0-canary.28

## 9.1.0-canary.27

## 9.1.0-canary.26

## 9.1.0-canary.25

## 9.1.0-canary.24

## 9.1.0-canary.23

## 9.1.0-canary.22

## 9.1.0-canary.21

## 9.1.0-canary.20

## 9.1.0-canary.19

## 9.1.0-canary.18

## 9.1.0-canary.17

## 9.1.0-canary.16

## 9.1.0-canary.15

## 9.0.4-canary.14

## 9.0.4-canary.13

## 9.0.4-canary.12

## 9.0.4-canary.11

## 9.0.4-canary.10

## 9.0.4-canary.9

## 9.0.4-canary.8

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

### Patch Changes

- [#2470](https://github.com/graphcommerce-org/graphcommerce/pull/2470) [`f5565b4`](https://github.com/graphcommerce-org/graphcommerce/commit/f5565b47d02c057d888fad94c1430d4e783c5e05) - Moved all test routes files to the demo package so they are out of the example directory. ([@paales](https://github.com/paales))

## 9.0.4-canary.0

## 9.0.0

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

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
