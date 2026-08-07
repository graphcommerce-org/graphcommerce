# @graphcommerce/storyblok-ui

## 10.1.0-canary.43

## 10.1.0-canary.42

## 10.1.0-canary.41

## 10.1.0-canary.40

### Patch Changes

- [#2661](https://github.com/graphcommerce-org/graphcommerce/pull/2661) [`c849720`](https://github.com/graphcommerce-org/graphcommerce/commit/c84972084d993a90526c1bf549d9ae75b54aebab) - Resolve `story` multilinks against the target's current slug instead of the frozen `cached_url`. `cached_url` is a snapshot taken when the _referencing_ story was last published, so renaming the target left every link to it pointing at a 404 until an editor re-published each referencing story. `multilinkHref` now prefers `story.full_slug` — populated from the `links` map the CDN resolves on every read, since `sbParams` always sends `resolve_links: 'story'` — which makes story links self-healing across renames. Other link types are unaffected. ([@paales](https://github.com/paales))

## 10.1.0-canary.39

### Minor Changes

- [#2652](https://github.com/graphcommerce-org/graphcommerce/pull/2652) [`cd21a97`](https://github.com/graphcommerce-org/graphcommerce/commit/cd21a97c705ced2d051351a2860780f9ba173d4b) - Let a Storyblok video asset show a poster.

  A `<video>` paints nothing until it has buffered enough for its first frame, and nothing at all when autoplay is blocked (iOS Low Power Mode) — so an autoplaying video banner starts out black, and can stay black. `Asset` now takes a `poster` prop, rendered as `<video poster>`.

  Storyblok's own `type: asset` has no room for a poster, so `assetWithPoster()` is added to read the convention of an asset value carrying an extra `poster` key:

  ```jsonc
  {
    "fieldtype": "asset",
    "id": 1,
    "filename": "…",
    "poster": { "filename": "…" },
  }
  ```

  Keeping the poster beside the asset rather than nesting both under a wrapper means a custom field type storing that shape is a drop-in for a plain asset field: existing content stays valid and `value.filename` keeps working for consumers that ignore the poster. The narrowing is unavoidable — Storyblok has no JSONSchema for custom field types, so its type generator emits `unknown` for them.

  ```tsx
  const { asset, poster } = assetWithPoster(blok.asset)
  return asset && <Asset asset={asset} poster={poster} />
  ```

  `@graphcommerce/image` gains `imageUrl(src, { width, quality })`, which builds an optimized URL outside of a React tree — for the places that need a bare URL string rather than an `<Image>`, such as `<video poster>`, a CSS `background-image` or an `og:image`. It routes through the configured loader exactly like `<Image>` does, so the bytes are served and cached by your own deployment rather than fetched from the origin host by every visitor, which matters when the origin meters bandwidth. `width` is snapped up to the nearest configured size, since the optimizer rejects any width outside `imageSizes`/`deviceSizes`. ([@bramvanderholst](https://github.com/bramvanderholst))

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

### Patch Changes

- [#2640](https://github.com/graphcommerce-org/graphcommerce/pull/2640) [`e6685c9`](https://github.com/graphcommerce-org/graphcommerce/commit/e6685c9bfc11d6a5214e4cf505d0113d08ff7381) - Add `requestStoryblokCacheVersionRefresh()` and stop the cache-version refresh from logging a spurious "apiPlugin not loaded" warning.

  On-demand revalidation (e.g. a cache-notify webhook) previously had to call `refreshStoryblokCacheVersion()`, which calls `getStoryblokApi()`. In a context where `storyblokInit` has not run — such as a serverless API route that never rendered a page — that logs "You can't use getStoryblokApi if you're not loading apiPlugin." The new `requestStoryblokCacheVersionRefresh()` only flips a flag that the next published read consumes, so it never touches the Storyblok client and never logs the warning. In a shared-process deployment (Kubernetes) the page regeneration that follows picks it up immediately; on serverless, freshness falls back to the `storyblok.cacheVersionTtl` interval.

  `refreshStoryblokCacheVersion()` is removed — replace any direct calls with `requestStoryblokCacheVersionRefresh()`. ([@bramvanderholst](https://github.com/bramvanderholst))

## 10.1.0-canary.27

### Patch Changes

- [#2639](https://github.com/graphcommerce-org/graphcommerce/pull/2639) [`6eb86fd`](https://github.com/graphcommerce-org/graphcommerce/commit/6eb86fd5833adfac3cd39a99d1841a8b95520ed5) - Refresh the pinned Storyblok cache-version (`cv`) on a TTL so published content no longer stays frozen on long-lived servers.

  `storyblok-js-client` pins the space `cv` per process on the first published request and never refreshes it (its `cache.clear` defaults to `'manual'`), so published edits only became visible after a process restart — on a multi-pod deployment this could mean content not updating for a long time. `fetchStory`, `fetchStories` and `fetchAllStories` now call the new `refreshStoryblokCacheVersion()` before published reads, which re-fetches `cdn/spaces/me` at most once per the new `storyblok.cacheVersionTtl` config (seconds, default 60; 0 refreshes on every read) to advance the pinned `cv`. Skipped for preview/draft and in development. The helper is exported so on-demand revalidation (e.g. a cache-notify webhook) can force an immediate refresh. ([@bramvanderholst](https://github.com/bramvanderholst))

## 10.1.0-canary.26

## 10.1.0-canary.25

## 10.1.0-canary.24

## 10.1.0-canary.23

### Patch Changes

- [#2634](https://github.com/graphcommerce-org/graphcommerce/pull/2634) [`e1a7e85`](https://github.com/graphcommerce-org/graphcommerce/commit/e1a7e856669b792b5c7464a7585868b4c8107622) - Sync Storyblok content with the Visual Editor's selected language ([@bramvanderholst](https://github.com/bramvanderholst))

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
