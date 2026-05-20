# @graphcommerce/storyblok-ui

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
