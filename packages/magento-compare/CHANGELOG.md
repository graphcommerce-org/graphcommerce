# @graphcommerce/magento-compare

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

### Patch Changes

- [#2529](https://github.com/graphcommerce-org/graphcommerce/pull/2529) [`b331f4d`](https://github.com/graphcommerce-org/graphcommerce/commit/b331f4d060c1385569fbbe1592ac245832de55bc) - Remove all usages of the NoSsr component as the GraphQL layer already handles this. ([@paales](https://github.com/paales))

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

## 9.0.4-canary.0

## 9.0.0

### Major Changes

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`530076e`](https://github.com/graphcommerce-org/graphcommerce/commit/530076e3664703cb8b577b7fcf1998a420819f60) - INP improvements: Moved all usages of `useFormPersist` to the `<FormPersist/>` component to prevent rerenders. ([@FrankHarland](https://github.com/FrankHarland))

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

- [#2305](https://github.com/graphcommerce-org/graphcommerce/pull/2305) [`77e8297`](https://github.com/graphcommerce-org/graphcommerce/commit/77e82976816994336c616208a651cb18ce9ea270) - Fix bug with persist not applying saved changes by moving `<FromPersist/>` below the form components. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2438](https://github.com/graphcommerce-org/graphcommerce/pull/2438) [`cb8d2f0`](https://github.com/graphcommerce-org/graphcommerce/commit/cb8d2f0059d64242260e30ce34655868f204ef4c) - Made all component prop types exported ([@bramvanderholst](https://github.com/bramvanderholst))

## 8.0.0

### Patch Changes

- [#2132](https://github.com/graphcommerce-org/graphcommerce/pull/2132) [`993f655`](https://github.com/graphcommerce-org/graphcommerce/commit/993f6559226f0ce2b63f372ccfc1409805b06a8d) - Compare button didn't have a proper hover state on the product page. ([@action-simon](https://github.com/action-simon))

## 7.0.0

### Major Changes

- [#1918](https://github.com/graphcommerce-org/graphcommerce/pull/1918) [`7dcf350c6`](https://github.com/graphcommerce-org/graphcommerce/commit/7dcf350c674dfe6dbf192ecfb5af3ee8180eb2f9) - Magento Product Compare functionality added ([@paales](https://github.com/paales))

- [`e55d8c390`](https://github.com/graphcommerce-org/graphcommerce/commit/e55d8c390d90b4bb7bab11c6a99027ac72bd7e3e) - Created a new sidebar layout system, can be configured with productFiltersLayout in the graphcommerce.config.js ([@paales](https://github.com/paales))

### Patch Changes

- [#1959](https://github.com/graphcommerce-org/graphcommerce/pull/1959) [`d0809b132`](https://github.com/graphcommerce-org/graphcommerce/commit/d0809b132a0e4cbdfeb86164f6c16a89ebecd987) - Added support for default values in the Config.graphqls files for the documentation ([@JoshuaS98](https://github.com/JoshuaS98))
