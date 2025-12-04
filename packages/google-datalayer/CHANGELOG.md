# @graphcommerce/google-datalayer

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

### Patch Changes

- [#2539](https://github.com/graphcommerce-org/graphcommerce/pull/2539) [`1a06135`](https://github.com/graphcommerce-org/graphcommerce/commit/1a061357f4ccb430dd13194f755815474e140520) - Allow awaitable async requests for onStart on checkout button ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2514](https://github.com/graphcommerce-org/graphcommerce/pull/2514) [`57ece20`](https://github.com/graphcommerce-org/graphcommerce/commit/57ece2097b9a3799e1d0a459c006dab656d20b9d) - Solve an issue where Analytics and Tagmanager events wouldn't be sent. Split useSendEvent and sendEvent methods into two files so plugins can be correctly applied to each. ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2337](https://github.com/graphcommerce-org/graphcommerce/pull/2337) [`18898df`](https://github.com/graphcommerce-org/graphcommerce/commit/18898df44b786dd68d8e6fec538e3db947c157e4) - All `sendEvent` calls are now the return type of `useSendEvent`, to allow plugins to use hooks themselves. ([@Renzovh](https://github.com/Renzovh))

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`e3fe4f7`](https://github.com/graphcommerce-org/graphcommerce/commit/e3fe4f73c8c3e3c6a5ec68cdc7a32820e8f69e07) - Solved an issue where the `BillingPage` query would be re-queried after setting the payment method. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2421](https://github.com/graphcommerce-org/graphcommerce/pull/2421) [`d500643`](https://github.com/graphcommerce-org/graphcommerce/commit/d500643138799b6db1610cb10a1d065d6219d8ea) - Resolve peer dependency issues so we get a clean install ([@paales](https://github.com/paales))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`43bd04a`](https://github.com/graphcommerce-org/graphcommerce/commit/43bd04a777c5800cc7e01bee1e123a5aad82f194) - Prevent the `<BillingPage />` query from rerunning on each mutation. ([@FrankHarland](https://github.com/FrankHarland))

- [#2246](https://github.com/graphcommerce-org/graphcommerce/pull/2246) [`fc5c04d`](https://github.com/graphcommerce-org/graphcommerce/commit/fc5c04d4a2c0301be7d3cc983d9b31f6fcaf6fe6) - Create `useRemoveItemFromCart` hook to allow for reuse while keeping compatibility with plugins. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 8.0.5

### Patch Changes

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`f120bce`](https://github.com/graphcommerce-org/graphcommerce/commit/f120bce617808d756aebb7c500aa1deb9e4cf487) - Google Datalayer, Analytics and Tagmanager improvements.

  - Removed `eventFormat` as we could automatically detec the correct event format and it is now the responsibility of GTM or the GTAG to handle the event format.
  - Created cartItemToGoogleDatalayerItem and productToGoogleDatalayerItem for easier modifications. ([@paales](https://github.com/paales))

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`cabeadc`](https://github.com/graphcommerce-org/graphcommerce/commit/cabeadce2b73ce072a2fa8b8ab1ab49907cda13b) - Added core web vitals measurements to the datalayer. ([@paales](https://github.com/paales))

## 8.0.4

### Patch Changes

- [#2158](https://github.com/graphcommerce-org/graphcommerce/pull/2158) [`34de808`](https://github.com/graphcommerce-org/graphcommerce/commit/34de8085e9352d1f3b20b26746685370ea10ab90) - Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events. ([@mikekeehnen](https://github.com/mikekeehnen))
