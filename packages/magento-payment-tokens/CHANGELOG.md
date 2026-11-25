# @graphcommerce/magento-payment-tokens

## 11.0.0-canary.65

## 11.0.0-canary.64

## 11.0.0-canary.63

## 11.0.0-canary.62

## 11.0.0-canary.61

## 11.0.0-canary.60

## 11.0.0-canary.59

## 11.0.0-canary.58

## 11.0.0-canary.57

### Major Changes

- [#2708](https://github.com/graphcommerce-org/graphcommerce/pull/2708) [`28aa653`](https://github.com/graphcommerce-org/graphcommerce/commit/28aa653188ed5dc4a0cc5401ee5149b31858e01d) - **Breaking change:** GraphCommerce imports `motion/react` and requires the `motion` package. In your project, replace the `framer-motion` dependency with `motion` 14 and change the imports from `framer-motion` to `motion/react`. ([@paales](https://github.com/paales))

- [#2708](https://github.com/graphcommerce-org/graphcommerce/pull/2708) [`cb36d6c`](https://github.com/graphcommerce-org/graphcommerce/commit/cb36d6c219e067ffe2fb2e847a8ff84e8f87a5e8) - **Breaking change:** GraphCommerce requires Lingui 6 and Node.js 22.19 or later. Lingui 6 has no `@lingui/macro` package: import the JSX macros from `@lingui/react/macro`. The `lingui-next` config excludes `.d.ts` files and `node_modules` outside the working directory too. ([@paales](https://github.com/paales))

## 11.0.0-canary.56

## 11.0.0-canary.55

## 11.0.0-canary.54

## 11.0.0-canary.53

## 11.0.0-canary.52

## 11.0.0-canary.51

## 11.0.0-canary.50

## 11.0.0-canary.49

## 11.0.0-canary.48

## 11.0.0-canary.47

## 11.0.0-canary.46

## 11.0.0-canary.45

## 10.1.0-canary.44

## 10.1.0-canary.43

## 10.1.0-canary.42

## 10.1.0-canary.41

## 10.1.0-canary.40

## 10.1.0-canary.39

## 10.1.0-canary.38

## 10.1.0-canary.37

## 10.1.0-canary.36

## 10.1.0-canary.35

## 10.1.0-canary.34

## 10.1.0-canary.33

## 10.1.0-canary.32

## 10.1.0-canary.31

## 10.1.0-canary.30

## 10.1.0-canary.29

## 10.1.0-canary.28

## 10.1.0-canary.27

## 10.1.0-canary.26

## 10.1.0-canary.25

## 10.1.0-canary.24

## 10.1.0-canary.23

## 10.1.0-canary.22

## 10.1.0-canary.21

## 10.1.0-canary.20

## 10.1.0-canary.19

## 10.1.0-canary.18

## 10.1.0-canary.17

## 10.1.0-canary.16

## 10.1.0-canary.15

## 10.1.0-canary.14

## 10.1.0-canary.13

## 10.1.0-canary.12

## 10.1.0-canary.11

## 10.1.0-canary.10

## 10.1.0-canary.9

## 10.1.0-canary.8

## 10.1.0-canary.7

## 10.1.0-canary.6

## 10.1.0-canary.5

## 10.1.0-canary.4

## 10.1.0-canary.3

## 10.0.4-canary.2

## 10.0.4-canary.1

## 10.0.4-canary.0

## 10.0.3

## 10.0.3-canary.0

## 10.0.2

## 10.0.2-canary.0

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

- [#2499](https://github.com/graphcommerce-org/graphcommerce/pull/2499) [`d06575b`](https://github.com/graphcommerce-org/graphcommerce/commit/d06575babfc10d172d16107a4ea29f245e18f387) - Created a Payment tokens package to be able to manage stored cards from the account section. ([@paales](https://github.com/paales))

- [`b7b65f3`](https://github.com/graphcommerce-org/graphcommerce/commit/b7b65f3e2ced4f2907b3a752b2230f19006fb9ae) - Create initial release ([@paales](https://github.com/paales))
