# @graphcommerce/magento-payment-adyen

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

### Patch Changes

- [#2495](https://github.com/graphcommerce-org/graphcommerce/pull/2495) [`0fc9805`](https://github.com/graphcommerce-org/graphcommerce/commit/0fc98051b87cd7fc0363609b50211d2d7382a84d) - Remove issuer list from ideal payment method ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

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

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`0767bc4`](https://github.com/graphcommerce-org/graphcommerce/commit/0767bc40f7b596209f24ca4e745ff0441f3275c9) - Upgrade input components to no longer use `muiRegister`, which improves INP scores. ([@FrankHarland](https://github.com/FrankHarland))

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`86ecf9a`](https://github.com/graphcommerce-org/graphcommerce/commit/86ecf9a1bb4c48ceabd4944d81483bcd5b990350) - Payment method will now throw an error in `onComplete` to handle obscure errors. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

- [#2305](https://github.com/graphcommerce-org/graphcommerce/pull/2305) [`77e8297`](https://github.com/graphcommerce-org/graphcommerce/commit/77e82976816994336c616208a651cb18ce9ea270) - Fix bug with persist not applying saved changes by moving `<FromPersist/>` below the form components. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`43bd04a`](https://github.com/graphcommerce-org/graphcommerce/commit/43bd04a777c5800cc7e01bee1e123a5aad82f194) - Prevent the `<BillingPage />` query from rerunning on each mutation. ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0

### Patch Changes

- [#1841](https://github.com/graphcommerce-org/graphcommerce/pull/1841) [`1ff022c4b`](https://github.com/graphcommerce-org/graphcommerce/commit/1ff022c4bd8ad1d9fa8c1760076f003af06ce421) - PaymentMethodUpdated is now @injectable to allow for easier customisation. ([@paales](https://github.com/paales))

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

### Minor Changes

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`2e68e0560`](https://github.com/graphcommerce-org/graphcommerce/commit/2e68e0560690bbf9bad6dc2b33d6e2ddb16197ce) - Adyen Payment gateway support ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`be10e8cd1`](https://github.com/graphcommerce-org/graphcommerce/commit/be10e8cd1dce172a914ee9e5f65fdca4d0929fc8) - Migrated payment methods to use the new `onSuccess` method from `PaymentMethodContextProvider` instead of redirecting manually, makes sure the onSuccess method can be used by plugins. ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`6171ad02c`](https://github.com/graphcommerce-org/graphcommerce/commit/6171ad02c19782b1e1f0eb00ea25ea6b764250b5) - Added topological sorting to plugins and added ifEnv export to plugins to conditionally load plugins ([@paales](https://github.com/paales))
