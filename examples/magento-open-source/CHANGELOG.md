# Change Log

## 10.0.0-canary.68

## 10.0.0-canary.67

### Patch Changes

- [#2540](https://github.com/graphcommerce-org/graphcommerce/pull/2540) [`36e2bac`](https://github.com/graphcommerce-org/graphcommerce/commit/36e2bacb4fe765ce1fcd24dc36736e90bb17a7dc) - Add billingAddress permission (EDITABLE | READONLY) that controls whether the end user can update their billing address in the account section and checkout. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 10.0.0-canary.66

## 10.0.0-canary.65

## 10.0.0-canary.64

## 10.0.0-canary.63

## 10.0.0-canary.62

## 10.0.0-canary.61

## 10.0.0-canary.60

### Patch Changes

- [#2556](https://github.com/graphcommerce-org/graphcommerce/pull/2556) [`4aa6c92`](https://github.com/graphcommerce-org/graphcommerce/commit/4aa6c9284cdc6a43abe1ba8173ad4840e0e808fc) - Bump next from 16.0.6 to 16.0.7 ([@dependabot](https://github.com/apps/dependabot))

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

### Patch Changes

- [#2539](https://github.com/graphcommerce-org/graphcommerce/pull/2539) [`22094bd`](https://github.com/graphcommerce-org/graphcommerce/commit/22094bd1724bf7917373200501217653bb588f5f) - Solve a version-skew problem where certain JS files weren't properly cached by the Service Worker, but the page was cached. The moment a user wanted to load the page the JS files would not exist and result in a 404. This in turn caused the the frontend to be broken until the page was reloaded.

  The cause is that if the prefetch requests fail, other prefetch requests are not made anymore. And since the js file wasn't cached by other buckets, it would result in a 404. ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2520](https://github.com/graphcommerce-org/graphcommerce/pull/2520) [`bf153c7`](https://github.com/graphcommerce-org/graphcommerce/commit/bf153c7a55ce02040b3d55045a0a9d9ea521f714) - fix: if relatedUpsells are not defined, use empty object so mergeDeep… ([@FrankHarland](https://github.com/FrankHarland))

## 9.1.0-canary.23

## 9.1.0-canary.22

## 9.1.0-canary.21

## 9.1.0-canary.20

## 9.1.0-canary.19

### Patch Changes

- [#2499](https://github.com/graphcommerce-org/graphcommerce/pull/2499) [`39058be`](https://github.com/graphcommerce-org/graphcommerce/commit/39058bef14622082ab5e327f13b5a52079c92622) - Support for Magento logo and Magento copyright notice in footer ([@paales](https://github.com/paales))

## 9.1.0-canary.18

## 9.1.0-canary.17

## 9.1.0-canary.16

## 9.1.0-canary.15

## 9.0.4-canary.14

## 9.0.4-canary.13

## 9.0.4-canary.12

### Patch Changes

- [#2492](https://github.com/graphcommerce-org/graphcommerce/pull/2492) [`2d41445`](https://github.com/graphcommerce-org/graphcommerce/commit/2d414456a827c778db390306a7c174a0b8f16ba1) - Solve issue where the category and search page would rerender on pageload because the mask value would flip from true to false ([@paales](https://github.com/paales))

## 9.0.4-canary.11

## 9.0.4-canary.10

## 9.0.4-canary.9

## 9.0.4-canary.8

## 9.0.4-canary.7

## 9.0.4-canary.6

### Patch Changes

- [#2478](https://github.com/graphcommerce-org/graphcommerce/pull/2478) [`16a3b73`](https://github.com/graphcommerce-org/graphcommerce/commit/16a3b73af173695605a0e8dfaa57777391e8b99d) - Solve issue where the performanceLink was only activated during production while it should have been during development. ([@paales](https://github.com/paales))

- [#2478](https://github.com/graphcommerce-org/graphcommerce/pull/2478) [`87df248`](https://github.com/graphcommerce-org/graphcommerce/commit/87df248a7154eed415da935d33f3cc6e48159ec9) - Solve issue where plurals weren't properly defined ([@paales](https://github.com/paales))

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0
