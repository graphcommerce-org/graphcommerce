# @graphcommerce/magento-search-overlay

## 10.0.1

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

- [#2533](https://github.com/graphcommerce-org/graphcommerce/pull/2533) [`88abcbf`](https://github.com/graphcommerce-org/graphcommerce/commit/88abcbf011b65b0cd1235e984f5d8306256bd518) - When loading the category/search page in the case that there are no filters applied, the amount or product related queries is reduced from 2 to 1 (ProductFilters is skipped). Pagination, sorting and search terms also do not affect this. When a filter is applied we fall back to the previous functionality and do a second query to retrieve the filters.

  This did not matter when the categories/search pages were served by Magento as Magento would cache the result of the ProductFilters query. When the the catalog is served by an external service like Algolia this might be a problem.

  Implementation details: When filters are applied (e.g., filtering by color:blue), the ProductList query only returns products matching that filter, which means other filter options (like other colors) are excluded from the filter options. This behavior is expected since those other options wouldn't return any products. However, when no filters are applied, the ProductList query returns all products along with all available filter options, eliminating the need for a separate ProductFilters query. ([@paales](https://github.com/paales))

## 9.0.1

### Patch Changes

- [#2461](https://github.com/graphcommerce-org/graphcommerce/pull/2461) [`24c68c1`](https://github.com/graphcommerce-org/graphcommerce/commit/24c68c1903d5396efee7f571a1380ffa234338fd) - Solve issue with the SearchField throwing an error in production. ([@paales](https://github.com/paales))

## 9.0.0

### Major Changes

- [#2361](https://github.com/graphcommerce-org/graphcommerce/pull/2361) [`9c3149c`](https://github.com/graphcommerce-org/graphcommerce/commit/9c3149cb7550c6bf7de4b8e3bcaabe2f6a70d5c7) - Completely new SearchOverlay package this is compatible with Magento's default search as well as any other implementation like Algolia and Adobe Sensei. ([@paales](https://github.com/paales))
