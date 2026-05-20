# Change Log

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

### Patch Changes

- [#2609](https://github.com/graphcommerce-org/graphcommerce/pull/2609) [`fe29527`](https://github.com/graphcommerce-org/graphcommerce/commit/fe295278cc159cbb375f3460a4edb5b1f902c27a) - Drop `@graphcommerce/magento-cms` from the Storyblok example, ship locale-redirect proxy with `storyblok-ui`

  The Storyblok example had several leftovers from a half-completed migration off Magento CMS, all conceptually out of place in an example whose purpose is "all content lives in Storyblok":

  - `pages/page/[...url].tsx` — a CMS page handler whose `getStaticPaths` called `getCategoryStaticPaths` (returns Magento **category** URLs). Feeding category URLs into the `cmsPage` query caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`.
  - `Layout.graphql` queried `cmsBlocks(["footer_links_block"])` but the resulting prop was destructured-and-discarded in both layout components — the Footer is fully driven by Storyblok's `globalConfig`. The dead query also produced noisy GraphQL errors at build time on backends without the block.
  - `pages/404.tsx` rendered a Magento `cms_no_route` CMS page (with a hardcoded fallback if absent).
  - `proxy.ts` was a hand-written file with hardcoded `LOCALES = ['en', 'nl']` — broken for any other storefront combination, and not using the plugin system.

  This PR:

  - Removes `pages/page/[...url].tsx`, the dead `cmsBlocks` query and unused destructures, the Magento CMS fallback in `pages/404.tsx`, and the `@graphcommerce/magento-cms` dependency
  - Migrates `proxy.ts` → standard managed re-export
  - **Adds `@graphcommerce/storyblok-ui/plugins/LocaleRedirectProxy.ts`** with `ifConfig: 'storyblok'` — every project depending on `@graphcommerce/storyblok-ui` now gets locale-redirect (Visual Editor `_storyblok_lang` + Accept-Language root) automatically, with locales read from `storefront` config

  If a project needs Magento CMS pages alongside Storyblok, it can re-add the dependency and a route — but the example should default to pure Storyblok. ([@paales](https://github.com/paales))

## 10.1.0-canary.5

## 10.1.0-canary.4

### Patch Changes

- [#2606](https://github.com/graphcommerce-org/graphcommerce/pull/2606) [`d30c568`](https://github.com/graphcommerce-org/graphcommerce/commit/d30c5681e018496ce44c349f69b122d143e894d2) - Fix issue where bootstrap from seed project was failing ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2606](https://github.com/graphcommerce-org/graphcommerce/pull/2606) [`d30c568`](https://github.com/graphcommerce-org/graphcommerce/commit/d30c5681e018496ce44c349f69b122d143e894d2) - Performance improvements for Storyblok bridge ([@bramvanderholst](https://github.com/bramvanderholst))

- [#2606](https://github.com/graphcommerce-org/graphcommerce/pull/2606) [`d30c568`](https://github.com/graphcommerce-org/graphcommerce/commit/d30c5681e018496ce44c349f69b122d143e894d2) - Added Storyblok pages to content sitemap ([@bramvanderholst](https://github.com/bramvanderholst))

## 10.1.0-canary.3

### Minor Changes

- [#2603](https://github.com/graphcommerce-org/graphcommerce/pull/2603) [`7198061`](https://github.com/graphcommerce-org/graphcommerce/commit/71980613241a240fa29ba9894872b90c3d32c2b6) - ## Storyblok example

  We're shipping `examples/magento-storyblok` — a full Storyblok CMS integration alongside the existing Hygraph example, so teams can pick the headless CMS that fits their workflow.

  **What's in the box**

  - Visual editing: live preview, click-to-edit on every blok, and SSR with client hydration
  - Row components out of the box: hero banners, special banners, quotes, button link lists, service options, product grids, blog content, and USPs — all editable in the Storyblok Visual Editor
  - Global config pattern for content shared across pages (footer links, social links, USPs) with live updates in the editor
  - Type-safe integration: generated TypeScript types for every component schema via the Storyblok CLI
  - `@graphcommerce/storyblok-ui` helpers: rich text renderer, asset component with video/image support, multilink resolution, product block resolution, and Visual Editor utilities

  **Getting started**

  - `yarn storyblok:bootstrap` seeds a new Storyblok space with all demo content (components, stories, assets) so a fresh install is editable in minutes
  - `spaceId` lives in `graphcommerce.config.cjs` alongside your other config — no separate env juggling
  - Components, stories, and assets are committed to the repo as the source of truth

  **Also includes**

  - Storyblok-aware Footer, Navigation, and PDP layouts wired to the global config
  - Blog support with tag filtering and pagination
  - Preview URL routing so the Visual Editor opens the right page for each story type ([@bramvanderholst](https://github.com/bramvanderholst))

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
