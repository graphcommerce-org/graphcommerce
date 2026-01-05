# @graphcommerce/magento-payment-multisafepay

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

- [#2495](https://github.com/graphcommerce-org/graphcommerce/pull/2495) [`cd386e3`](https://github.com/graphcommerce-org/graphcommerce/commit/cd386e3bce61256bab46cca88aacc7c4aa4ac415) - Remove issuers field from MultiSafePay in preparation for iDeal 2. Please not that this change requires an upgrade to the Magento module as well. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2495](https://github.com/graphcommerce-org/graphcommerce/pull/2495) [`0fc9805`](https://github.com/graphcommerce-org/graphcommerce/commit/0fc98051b87cd7fc0363609b50211d2d7382a84d) - Remove issuer list from ideal payment method ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [`686722c`](https://github.com/graphcommerce-org/graphcommerce/commit/686722cb35dadbbe0dc1c8d144b1f5e2b65d433d) - docs ([@paales](https://github.com/paales))

- [#2539](https://github.com/graphcommerce-org/graphcommerce/pull/2539) [`21dc35d`](https://github.com/graphcommerce-org/graphcommerce/commit/21dc35d09521f47b7f91dc868ca776603e2da4a2) - Solve issue where the cart would remain locked if a user would return to the website without going through the checkout/payment step. ([@paales](https://github.com/paales))

- [#2539](https://github.com/graphcommerce-org/graphcommerce/pull/2539) [`6a55be4`](https://github.com/graphcommerce-org/graphcommerce/commit/6a55be43ab1f53eb689abf8ad742383daf65822e) - Solve issue where the MSPPaymentHandler query would be executed multiple times. ([@paales](https://github.com/paales))

## 9.0.0

### Major Changes

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`530076e`](https://github.com/graphcommerce-org/graphcommerce/commit/530076e3664703cb8b577b7fcf1998a420819f60) - INP improvements: Moved all usages of `useFormPersist` to the `<FormPersist/>` component to prevent rerenders. ([@FrankHarland](https://github.com/FrankHarland))

### Patch Changes

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`86ecf9a`](https://github.com/graphcommerce-org/graphcommerce/commit/86ecf9a1bb4c48ceabd4944d81483bcd5b990350) - Payment method will now throw an error in `onComplete` to handle obscure errors. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

- [#2305](https://github.com/graphcommerce-org/graphcommerce/pull/2305) [`77e8297`](https://github.com/graphcommerce-org/graphcommerce/commit/77e82976816994336c616208a651cb18ce9ea270) - Fix bug with persist not applying saved changes by moving `<FromPersist/>` below the form components. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 6.0.0

### Minor Changes

- [#1790](https://github.com/graphcommerce-org/graphcommerce/pull/1790) [`1fbd1e2b2`](https://github.com/graphcommerce-org/graphcommerce/commit/1fbd1e2b20cd875c481e10a81343da961c8baf8f) - MultiSafePay now shows an error snackbar, added the ability to restore/refetch the cart, and a fix for the cart not being found when restoring the cart. ([@LaurensFranken](https://github.com/LaurensFranken))

### Patch Changes

- [#1841](https://github.com/graphcommerce-org/graphcommerce/pull/1841) [`beb75b7a5`](https://github.com/graphcommerce-org/graphcommerce/commit/beb75b7a5c8f32f0b74b62bb0931baf887b17adf) - Muiltisafepay: `MSPPaymentOptionsAndPlaceOrder` is now split into two separate components to allow for surcharges when selecting a payment method. ([@paales](https://github.com/paales))

- [#1778](https://github.com/graphcommerce-org/graphcommerce/pull/1778) [`bac564119`](https://github.com/graphcommerce-org/graphcommerce/commit/bac5641198b8c91df0e27a730cd663fd177afc70) - Added proper translations for iDeal Multi Safe Pay ([@FrankHarland](https://github.com/FrankHarland))

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

- [#1729](https://github.com/graphcommerce-org/graphcommerce/pull/1729) [`366b05a7d`](https://github.com/graphcommerce-org/graphcommerce/commit/366b05a7da174a8a7c665b44e11422d8c873e4ed) - MultiSafePay Payment gateway support ([@paales](https://github.com/paales))

### Patch Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`b2d73c726`](https://github.com/graphcommerce-org/graphcommerce/commit/b2d73c726fa123435fa6c54b4e0fd0db2df7c4ab) - Move to <Prev/> instead of <Component/> to call the plugin component ([@paales](https://github.com/paales))

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`be10e8cd1`](https://github.com/graphcommerce-org/graphcommerce/commit/be10e8cd1dce172a914ee9e5f65fdca4d0929fc8) - Migrated payment methods to use the new `onSuccess` method from `PaymentMethodContextProvider` instead of redirecting manually, makes sure the onSuccess method can be used by plugins. ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))
