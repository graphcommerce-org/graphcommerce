# @graphcommerce/hygraph-dynamic-rows-ui

## 10.0.1-canary.3

## 10.0.1-canary.2

## 10.0.1-canary.1

## 10.0.1-canary.0

### Patch Changes

- [#2568](https://github.com/graphcommerce-org/graphcommerce/pull/2568) [`71e2bcc`](https://github.com/graphcommerce-org/graphcommerce/commit/71e2bcc86db52b937b629f8f0a4defef107ff973) - Peer dependency issues ([@paales](https://github.com/paales))

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

- [#2556](https://github.com/graphcommerce-org/graphcommerce/pull/2556) [`4aa6c92`](https://github.com/graphcommerce-org/graphcommerce/commit/4aa6c9284cdc6a43abe1ba8173ad4840e0e808fc) - Bump next from 16.0.6 to 16.0.7 ([@dependabot](https://github.com/apps/dependabot))

## 9.0.0

### Major Changes

- [#2308](https://github.com/graphcommerce-org/graphcommerce/pull/2308) [`8faa5ac`](https://github.com/graphcommerce-org/graphcommerce/commit/8faa5ac618ecfdacd6d5eb751b4110c423aef97f) - Added Draft Mode support. When enabled it will be shown. ([@paales](https://github.com/paales))

### Patch Changes

- [#2347](https://github.com/graphcommerce-org/graphcommerce/pull/2347) [`7fa50a2`](https://github.com/graphcommerce-org/graphcommerce/commit/7fa50a2f21ee9edbc67d06d7694316f101f9415f) - Resolve issue where the dynamic rows UI wouldn’t load any definitions ([@paales](https://github.com/paales))

- [#2316](https://github.com/graphcommerce-org/graphcommerce/pull/2316) [`28d4708`](https://github.com/graphcommerce-org/graphcommerce/commit/28d470861a10a38690d565d236ce573905038d2b) - Solve bugs in the Dynamic Row UI module and styled the config screen. ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2410](https://github.com/graphcommerce-org/graphcommerce/pull/2410) [`2a425b3`](https://github.com/graphcommerce-org/graphcommerce/commit/2a425b323ddaf0918c549e93b598888db7328d66) - Allow attributes with deprecationReasons (e.g. custom attributes) as PropertyPicker value ([@carlocarels90](https://github.com/carlocarels90))

## 8.0.0

### Minor Changes

- [#2100](https://github.com/graphcommerce-org/graphcommerce/pull/2100) [`4df891a`](https://github.com/graphcommerce-org/graphcommerce/commit/4df891a4c18b29cc52447eab3a97c66948b6c18f) - Add Dynamic Row UI for property UI field through a custom Hygraph application ([@JoshuaS98](https://github.com/JoshuaS98))
