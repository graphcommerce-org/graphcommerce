# @graphcommerce/hygraph-dynamic-rows

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

- [#2565](https://github.com/graphcommerce-org/graphcommerce/pull/2565) [`c96dfcd`](https://github.com/graphcommerce-org/graphcommerce/commit/c96dfcdca981baca387c270ad9e2b9515cdd00cc) - Updated to Apollo Client 4 ([@paales](https://github.com/paales))

### Patch Changes

- [#2477](https://github.com/graphcommerce-org/graphcommerce/pull/2477) [`8015eab`](https://github.com/graphcommerce-org/graphcommerce/commit/8015eabc130dacf1f2703980cd5f0ad2c550aa4d) - Upgraded to @apollo/client 3.12.3 without impacting typescript compilation performance. ([@paales](https://github.com/paales))

## 9.0.0

### Major Changes

### Patch Changes

- [#2318](https://github.com/graphcommerce-org/graphcommerce/pull/2318) [`886837f`](https://github.com/graphcommerce-org/graphcommerce/commit/886837ff44d95404512716dbb9b2272c38b9ad27) - Remove `row` field on DynamicRows` model ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2268](https://github.com/graphcommerce-org/graphcommerce/pull/2268) [`8ffe2d5`](https://github.com/graphcommerce-org/graphcommerce/commit/8ffe2d5d1b040797ee4987d7740de5fdeadd4f72) - Solve issue where an Apollo object couldn't be modified as it is read only when Dynamic rows are added to the project. ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 8.0.5

### Patch Changes

- [#2238](https://github.com/graphcommerce-org/graphcommerce/pull/2238) [`db86432`](https://github.com/graphcommerce-org/graphcommerce/commit/db864324277fd5fb680c66eaa87d211cd7be4905) - Changed query limit to 100 from a 1000 on HygraphAllPages and AllDynamicRows query and added pagination. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 8.0.0

### Patch Changes

- [`df385d9`](https://github.com/graphcommerce-org/graphcommerce/commit/df385d9a2e724715e0f08cc13b1bef6748b38b82) - Allow muiltiple rows for each Dynamic Row entry in Hygraph ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2182](https://github.com/graphcommerce-org/graphcommerce/pull/2182) [`a93c312`](https://github.com/graphcommerce-org/graphcommerce/commit/a93c312b9d6e0d6cc102b49cc3ad02953200a1f6) - Dynamic rows would break page rendering if there was a dynamic row but no page returned ([@paales](https://github.com/paales))

## 7.0.0

### Major Changes

- [#1912](https://github.com/graphcommerce-org/graphcommerce/pull/1912) [`a43d389e9`](https://github.com/graphcommerce-org/graphcommerce/commit/a43d389e956fe69b73238b12c98c781b7044e4bb) - Added dynamic rows feature ([@JoshuaS98](https://github.com/JoshuaS98))
