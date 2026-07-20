# Change Log

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

### Minor Changes

- [#2637](https://github.com/graphcommerce-org/graphcommerce/pull/2637) [`bdaa6ec`](https://github.com/graphcommerce-org/graphcommerce/commit/bdaa6ec6aa2669b74fc6702ad46336db4c154b7c) - Refactored `LayoutNavigation` into composable pieces (`Header`, `HeaderContainer`, `MenuOverlay`, project-local `LayoutDefault`). `LayoutDefault` / `LayoutDefaultProps` in `@graphcommerce/next-ui` are marked `@deprecated`. If you are upgrading and do not want these changes, you can just discard them. This is just a structural change for more ease of use. No visually change. ([@bramvanderholst](https://github.com/bramvanderholst))

## 10.1.0-canary.24

### Patch Changes

- [#2636](https://github.com/graphcommerce-org/graphcommerce/pull/2636) [`0af6794`](https://github.com/graphcommerce-org/graphcommerce/commit/0af679485950c934cdadc56b8b3ea8ace9de8ab9) - Fix for codegen issue where codegen would stop (without error) halfway through ([@bramvanderholst](https://github.com/bramvanderholst))

## 10.1.0-canary.23

### Patch Changes

- [#2634](https://github.com/graphcommerce-org/graphcommerce/pull/2634) [`06082ad`](https://github.com/graphcommerce-org/graphcommerce/commit/06082ad47a59217fbdfb24f1a60411e4d0eecd9b) - Make GraphCommerce compatible with Apollo Client 4.2+ by augmenting Apollo's `DefaultOptions` type with the `preview` extension and the SSR clients' `errorPolicy: 'all'` default. ([@bramvanderholst](https://github.com/bramvanderholst))

## 10.1.0-canary.22

## 10.1.0-canary.21

## 10.1.0-canary.20

## 10.1.0-canary.19

## 10.1.0-canary.18

## 10.1.0-canary.17

### Patch Changes

- [#2623](https://github.com/graphcommerce-org/graphcommerce/pull/2623) [`241576a`](https://github.com/graphcommerce-org/graphcommerce/commit/241576a981fe97595000d74630a8ac8544a5e77f) - Bump Next.js from 16.1.1 to 16.2.6 across the framework and example storefronts. Also bumps the matching `@next/env` and `@next/eslint-plugin-next` pins. ([@paales](https://github.com/paales))

## 10.1.0-canary.16

## 10.1.0-canary.15

### Patch Changes

- [#2623](https://github.com/graphcommerce-org/graphcommerce/pull/2623) [`241576a`](https://github.com/graphcommerce-org/graphcommerce/commit/241576a981fe97595000d74630a8ac8544a5e77f) - Bump Next.js from 16.1.1 to 16.2.6 across the framework and example storefronts. Also bumps the matching `@next/env` and `@next/eslint-plugin-next` pins. ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2608](https://github.com/graphcommerce-org/graphcommerce/pull/2608) [`5986400`](https://github.com/graphcommerce-org/graphcommerce/commit/59864002d744da106f16f99636e163209d4165be) - Fix CMS page prerender crash caused by incorrect static-paths source

  `pages/page/[...url].tsx` used `getCategoryStaticPaths`, which feeds Magento **category** URLs into the `cmsPage` query. Any category URL without a matching CMS page identifier caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`.

  The handler now returns `{ paths: [], fallback: 'blocking' }`. CMS pages render on first request and are ISR-cached afterwards. ([@paales](https://github.com/paales))

## 10.1.0-canary.4

## 10.1.0-canary.3

## 10.0.4-canary.2

## 10.0.4-canary.1

## 10.0.4-canary.0

## 10.0.3

## 10.0.3-canary.0

## 10.0.2

## 10.0.2-canary.0

## 10.0.1

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

### Patch Changes

- [#2539](https://github.com/graphcommerce-org/graphcommerce/pull/2539) [`22094bd`](https://github.com/graphcommerce-org/graphcommerce/commit/22094bd1724bf7917373200501217653bb588f5f) - Solve a version-skew problem where certain JS files weren't properly cached by the Service Worker, but the page was cached. The moment a user wanted to load the page the JS files would not exist and result in a 404. This in turn caused the the frontend to be broken until the page was reloaded.

  The cause is that if the prefetch requests fail, other prefetch requests are not made anymore. And since the js file wasn't cached by other buckets, it would result in a 404. ([@paales](https://github.com/paales))

- [#2520](https://github.com/graphcommerce-org/graphcommerce/pull/2520) [`bf153c7`](https://github.com/graphcommerce-org/graphcommerce/commit/bf153c7a55ce02040b3d55045a0a9d9ea521f714) - fix: if relatedUpsells are not defined, use empty object so mergeDeep… ([@FrankHarland](https://github.com/FrankHarland))

- [#2540](https://github.com/graphcommerce-org/graphcommerce/pull/2540) [`36e2bac`](https://github.com/graphcommerce-org/graphcommerce/commit/36e2bacb4fe765ce1fcd24dc36736e90bb17a7dc) - Add billingAddress permission (EDITABLE | READONLY) that controls whether the end user can update their billing address in the account section and checkout. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#2478](https://github.com/graphcommerce-org/graphcommerce/pull/2478) [`16a3b73`](https://github.com/graphcommerce-org/graphcommerce/commit/16a3b73af173695605a0e8dfaa57777391e8b99d) - Solve issue where the performanceLink was only activated during production while it should have been during development. ([@paales](https://github.com/paales))

- [#2556](https://github.com/graphcommerce-org/graphcommerce/pull/2556) [`4aa6c92`](https://github.com/graphcommerce-org/graphcommerce/commit/4aa6c9284cdc6a43abe1ba8173ad4840e0e808fc) - Bump next from 16.0.6 to 16.0.7 ([@dependabot](https://github.com/apps/dependabot))

- [#2492](https://github.com/graphcommerce-org/graphcommerce/pull/2492) [`2d41445`](https://github.com/graphcommerce-org/graphcommerce/commit/2d414456a827c778db390306a7c174a0b8f16ba1) - Solve issue where the category and search page would rerender on pageload because the mask value would flip from true to false ([@paales](https://github.com/paales))

- [#2499](https://github.com/graphcommerce-org/graphcommerce/pull/2499) [`39058be`](https://github.com/graphcommerce-org/graphcommerce/commit/39058bef14622082ab5e327f13b5a52079c92622) - Support for Magento logo and Magento copyright notice in footer ([@paales](https://github.com/paales))

- [#2478](https://github.com/graphcommerce-org/graphcommerce/pull/2478) [`87df248`](https://github.com/graphcommerce-org/graphcommerce/commit/87df248a7154eed415da935d33f3cc6e48159ec9) - Solve issue where plurals weren't properly defined ([@paales](https://github.com/paales))
