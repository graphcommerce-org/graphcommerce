# Change Log

## 10.0.0-canary.70

### Major Changes

- [#2565](https://github.com/graphcommerce-org/graphcommerce/pull/2565) [`c96dfcd`](https://github.com/graphcommerce-org/graphcommerce/commit/c96dfcdca981baca387c270ad9e2b9515cdd00cc) - Updated to Apollo Client 4 ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2537](https://github.com/graphcommerce-org/graphcommerce/pull/2537) [`6e2714c`](https://github.com/graphcommerce-org/graphcommerce/commit/6e2714ccae22b806792891928a7ec9a14c272e66) - Solve issue where cached data was stale ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`cf9eafb`](https://github.com/graphcommerce-org/graphcommerce/commit/cf9eafb9d71991852510f632c692679810b9e76f) - Prepare the RichTex for embed and code-block ([@paales](https://github.com/paales))

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`2085f0b`](https://github.com/graphcommerce-org/graphcommerce/commit/2085f0b30dfadd9ab589fde962f59e87b3f30b34) - Forward `<Asset unoptimized />` component to `<Image />` ([@paales](https://github.com/paales))

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

## 9.0.1

### Patch Changes

- [#2461](https://github.com/graphcommerce-org/graphcommerce/pull/2461) [`838fe30`](https://github.com/graphcommerce-org/graphcommerce/commit/838fe30a649f8feedbd2a9333430e724b0ebd67f) - Solve issue where the preview mode wouldn't initialize if the hygraphLocales weren't defined ([@paales](https://github.com/paales))

- [#2461](https://github.com/graphcommerce-org/graphcommerce/pull/2461) [`68f2861`](https://github.com/graphcommerce-org/graphcommerce/commit/68f28616fd33aa64cb555e8cf9bf64954ea92383) - Support for new asset system of Hygraph ([@paales](https://github.com/paales))

## 9.0.0

### Minor Changes

- [#2223](https://github.com/graphcommerce-org/graphcommerce/pull/2223) [`0ccec63`](https://github.com/graphcommerce-org/graphcommerce/commit/0ccec630825d5fad398366beae90b3c90b2f84b8) - Added separate sitemap for Hygraph pages ([@bramvanderholst](https://github.com/bramvanderholst))

### Patch Changes

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`f71b4e2`](https://github.com/graphcommerce-org/graphcommerce/commit/f71b4e2d13e54dd311eb1465a49df41703b6fef5) - Renamed from `@graphcommerce/graphcms-ui` to `@graphcommerce/hygraph-ui`. ([@paales](https://github.com/paales))
