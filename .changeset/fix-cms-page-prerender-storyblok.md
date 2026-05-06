---
'@graphcommerce/magento-storyblok': patch
'@graphcommerce/storyblok-ui': patch
---

Drop `@graphcommerce/magento-cms` from the Storyblok example, ship the Visual Editor proxy with `storyblok-ui`

The Storyblok example had several leftovers from a half-completed migration off Magento CMS, all conceptually out of place in an example whose purpose is "all content lives in Storyblok":

- `pages/page/[...url].tsx` — a CMS page handler whose `getStaticPaths` called `getCategoryStaticPaths` (returns Magento **category** URLs). Feeding category URLs into the `cmsPage` query caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`.
- `Layout.graphql` queried `cmsBlocks(["footer_links_block"])` but the resulting prop was destructured-and-discarded in both layout components — the Footer is fully driven by Storyblok's `globalConfig`. The dead query also produced noisy GraphQL errors at build time on backends without the block.
- `pages/404.tsx` rendered a Magento `cms_no_route` CMS page (with a hardcoded fallback if absent).
- `proxy.ts` was a hand-written file with hardcoded `LOCALES = ['en', 'nl']` — broken for any other storefront combination, and not using the plugin system.

This PR:

- Removes `pages/page/[...url].tsx`, the dead `cmsBlocks` query and unused destructures, the Magento CMS fallback in `pages/404.tsx`, and the `@graphcommerce/magento-cms` dependency
- Migrates `proxy.ts` → standard managed re-export
- **Adds `@graphcommerce/storyblok-ui/plugins/StoryblokVisualEditorProxy.ts`** with `ifConfig: 'storyblok'` — every project depending on `@graphcommerce/storyblok-ui` now gets Visual Editor locale routing automatically, no manual setup
- Adds an example-level `plugins/LocaleRedirectProxy.ts` for the (generic, opt-in) Accept-Language root redirect — reads locales from `storefront` config instead of hardcoding `['en', 'nl']`

If a project needs Magento CMS pages alongside Storyblok, it can re-add the dependency and a route — but the example should default to pure Storyblok.
