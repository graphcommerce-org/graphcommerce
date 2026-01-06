# @graphcommerce/misc

## 10.0.2

## 10.0.2-canary.0

## 10.0.1

### Patch Changes

- [#2569](https://github.com/graphcommerce-org/graphcommerce/pull/2569) [`f76edb7`](https://github.com/graphcommerce-org/graphcommerce/commit/f76edb73e7ea172a4f1596e91a76dc7b38ca35ee) - Fix issue with container sizing of breadcrumb ([@paales](https://github.com/paales))

- [#2568](https://github.com/graphcommerce-org/graphcommerce/pull/2568) [`6277f34`](https://github.com/graphcommerce-org/graphcommerce/commit/6277f3417d56f3b6728787d5a4529d801b228a0c) - Solve issue where reactCompiler was enabled but the babel package wasn't installed and thus erroring. ([@paales](https://github.com/paales))

- [#2576](https://github.com/graphcommerce-org/graphcommerce/pull/2576) [`4d2adec`](https://github.com/graphcommerce-org/graphcommerce/commit/4d2adecc619278f5129f41b8b844b31f17469c15) - release again ([@paales](https://github.com/paales))

- [#2572](https://github.com/graphcommerce-org/graphcommerce/pull/2572) [`acd9973`](https://github.com/graphcommerce-org/graphcommerce/commit/acd997304f704ccbd50b289a62310b1bd2459edc) - Change release ([@paales](https://github.com/paales))

- [#2569](https://github.com/graphcommerce-org/graphcommerce/pull/2569) [`93e4c12`](https://github.com/graphcommerce-org/graphcommerce/commit/93e4c1246967c8cdb46f7cd719a87db336b895ab) - Docs ([@paales](https://github.com/paales))

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

### Patch Changes

- [`74462d5`](https://github.com/graphcommerce-org/graphcommerce/commit/74462d57fc86e5d172e2d337cdb9747c63c1b094) - Bump 2 ([@paales](https://github.com/paales))

- [#2539](https://github.com/graphcommerce-org/graphcommerce/pull/2539) [`22094bd`](https://github.com/graphcommerce-org/graphcommerce/commit/22094bd1724bf7917373200501217653bb588f5f) - Solve a version-skew problem where certain JS files weren't properly cached by the Service Worker, but the page was cached. The moment a user wanted to load the page the JS files would not exist and result in a 404. This in turn caused the the frontend to be broken until the page was reloaded.

  The cause is that if the prefetch requests fail, other prefetch requests are not made anymore. And since the js file wasn't cached by other buckets, it would result in a 404. ([@paales](https://github.com/paales))

- [#2493](https://github.com/graphcommerce-org/graphcommerce/pull/2493) [`cff4172`](https://github.com/graphcommerce-org/graphcommerce/commit/cff417226b70fe84023afbe236fa61660ac2ceea) - When the added product can't be found, make sure to render just 'Product' instead of an empty string and show a cart icon instead of a placeholder. ([@paales](https://github.com/paales))

- [`d1f1043`](https://github.com/graphcommerce-org/graphcommerce/commit/d1f1043b5949cb344ab44ab4e7ec566ed31d747b) - Bump versions ([@paales](https://github.com/paales))

- [`f498226`](https://github.com/graphcommerce-org/graphcommerce/commit/f4982262289bf525da7b102d44fb9c1f06367edb) - Solve issue where the translations weren't loaded when only using graphqlSharedClient instead of graphqlSsrClient. ([@paales](https://github.com/paales))

- [#2478](https://github.com/graphcommerce-org/graphcommerce/pull/2478) [`16a3b73`](https://github.com/graphcommerce-org/graphcommerce/commit/16a3b73af173695605a0e8dfaa57777391e8b99d) - Solve issue where the performanceLink was only activated during production while it should have been during development. ([@paales](https://github.com/paales))

- [#2487](https://github.com/graphcommerce-org/graphcommerce/pull/2487) [`af04d45`](https://github.com/graphcommerce-org/graphcommerce/commit/af04d45d51bdb1b7f0221a96dc0867234a581cc8) - Added missing WebWorker tsconfig for magento-open-source example ([@paales](https://github.com/paales))

- [#2556](https://github.com/graphcommerce-org/graphcommerce/pull/2556) [`4aa6c92`](https://github.com/graphcommerce-org/graphcommerce/commit/4aa6c9284cdc6a43abe1ba8173ad4840e0e808fc) - Bump next from 16.0.6 to 16.0.7 ([@dependabot](https://github.com/apps/dependabot))

- [`261a462`](https://github.com/graphcommerce-org/graphcommerce/commit/261a462fca6212bb2a76f62cb38fd09f2d0cc82e) - bump version ([@paales](https://github.com/paales))

- [#2492](https://github.com/graphcommerce-org/graphcommerce/pull/2492) [`2d41445`](https://github.com/graphcommerce-org/graphcommerce/commit/2d414456a827c778db390306a7c174a0b8f16ba1) - Solve issue where the category and search page would rerender on pageload because the mask value would flip from true to false ([@paales](https://github.com/paales))

- [#2499](https://github.com/graphcommerce-org/graphcommerce/pull/2499) [`39058be`](https://github.com/graphcommerce-org/graphcommerce/commit/39058bef14622082ab5e327f13b5a52079c92622) - Support for Magento logo and Magento copyright notice in footer ([@paales](https://github.com/paales))

- [#2478](https://github.com/graphcommerce-org/graphcommerce/pull/2478) [`87df248`](https://github.com/graphcommerce-org/graphcommerce/commit/87df248a7154eed415da935d33f3cc6e48159ec9) - Solve issue where plurals weren't properly defined ([@paales](https://github.com/paales))

- [#2493](https://github.com/graphcommerce-org/graphcommerce/pull/2493) [`7fbdfd5`](https://github.com/graphcommerce-org/graphcommerce/commit/7fbdfd5cd0d11c6f7a11634891ec66f47d074e5a) - Make sure the maxWidth of the newsletter subscribe box is sm instead of ms, making it too wide. ([@paales](https://github.com/paales))

## 9.0.2

### Patch Changes

- [`9ba1817`](https://github.com/graphcommerce-org/graphcommerce/commit/9ba1817467a063b59bce8fa2c61d56c4df65fd9b) - Solve issue where the filtered pages would throw an error because null object types were forwarded. ([@paales](https://github.com/paales))

## 9.0.1

### Patch Changes

- [#2461](https://github.com/graphcommerce-org/graphcommerce/pull/2461) [`fbe78be`](https://github.com/graphcommerce-org/graphcommerce/commit/fbe78be4e6b46745384354b6da26151c9d269b18) - Solve issue where the cart item edit form wasn't aligned in the middle ([@paales](https://github.com/paales))

- [#2456](https://github.com/graphcommerce-org/graphcommerce/pull/2456) [`d742381`](https://github.com/graphcommerce-org/graphcommerce/commit/d742381c6010f8b0c7921984cfe018561472a7e4) - Cleaned up CHANGELOG.md files and generated release notes ([@paales](https://github.com/paales))
