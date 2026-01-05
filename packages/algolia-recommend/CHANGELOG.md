# @graphcommerce/algolia-recommend

## 10.0.1

## 10.0.1-canary.4

## 10.0.1-canary.3

## 10.0.1-canary.2

## 10.0.1-canary.1

## 10.0.1-canary.0

## 10.0.0

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

### Patch Changes

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4f9ddb8`](https://github.com/graphcommerce-org/graphcommerce/commit/4f9ddb820494a89a6ae37df6e2befa59910330b4) - Updated Algolia to the latest version of the spec. ([@paales](https://github.com/paales))

- [#2499](https://github.com/graphcommerce-org/graphcommerce/pull/2499) [`32b65d6`](https://github.com/graphcommerce-org/graphcommerce/commit/32b65d6a805b84423f77bfbfe80ee3331da70718) - Make facetName and facetValue optional when retrieving trending products ([@paales](https://github.com/paales))

- [`a4de6ba`](https://github.com/graphcommerce-org/graphcommerce/commit/a4de6ba35d639fd6a7653463c2e26089d47842d0) - Solve issue where recommendations couldn't be retrieved ([@paales](https://github.com/paales))

- [#2499](https://github.com/graphcommerce-org/graphcommerce/pull/2499) [`48d8922`](https://github.com/graphcommerce-org/graphcommerce/commit/48d892236c8fc41e058013b6d4ab98b76fb47fca) - Solve issue where trendingProducts or trendingFacetValues couldn’t be resolved becasue root would be null ([@paales](https://github.com/paales))

## 9.0.0

### Major Changes

- [#2377](https://github.com/graphcommerce-org/graphcommerce/pull/2377) [`56fcc45`](https://github.com/graphcommerce-org/graphcommerce/commit/56fcc45b60e43574c64fcdd7b02f8062d677e250) - Algolia: Integrated algolia recommend queries into graphql mesh. Provide accurate upsells and related products on pdp pages ([@Renzovh](https://github.com/Renzovh))

### Patch Changes

- [#2385](https://github.com/graphcommerce-org/graphcommerce/pull/2385) [`44f18b5`](https://github.com/graphcommerce-org/graphcommerce/commit/44f18b5a8986935728f7147d6f506dd1376fd594) - Algolia: Added support for Adobe Commerce for Algolia. ([@paales](https://github.com/paales))

- [#2379](https://github.com/graphcommerce-org/graphcommerce/pull/2379) [`ce30678`](https://github.com/graphcommerce-org/graphcommerce/commit/ce30678ad353ac4c7c38d79e96a2bb3de55f6fcb) - Algolia: Automatically fall back to existing upsells/related products if they are defined and Algolia returns an error ([@paales](https://github.com/paales))
