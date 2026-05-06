---
'@graphcommerce/magento-storyblok': patch
---

Drop `@graphcommerce/magento-cms` from the Storyblok example and migrate the proxy to a plugin

The Storyblok example had several leftovers from a half-completed migration off Magento CMS, all conceptually out of place in an example whose purpose is "all content lives in Storyblok":

- `pages/page/[...url].tsx` — a CMS page handler whose `getStaticPaths` called `getCategoryStaticPaths` (returns Magento **category** URLs). Feeding category URLs into the `cmsPage` query caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`.
- `Layout.graphql` queried `cmsBlocks(["footer_links_block"])` but the resulting prop was destructured-and-discarded in both layout components — the Footer is fully driven by Storyblok's `globalConfig`. The dead query also produced noisy GraphQL errors at build time on backends that don't have the block.
- `pages/404.tsx` rendered a Magento `cms_no_route` CMS page (with a hardcoded fallback if absent).

This PR removes:

- The `pages/page/[...url].tsx` route
- The `cmsBlocks` query from `Layout.graphql` and the unused destructures in `LayoutNavigation.tsx` / `LayoutMinimal.tsx`
- The Magento CMS fallback in `pages/404.tsx` (the hardcoded fallback text remains)
- `@graphcommerce/magento-cms` from `package.json`

It also migrates `proxy.ts` to the plugin system: the file is now the standard managed re-export, and the locale-redirect logic moved to `plugins/LocaleRedirectProxy.ts`. The plugin reads locales from the `storefront` config instead of the hardcoded `['en', 'nl']` list, so it works correctly on any storefront combination.

If a project needs Magento CMS pages alongside Storyblok, it can re-add the dependency and a route — but the example should default to pure Storyblok.
