---
'@graphcommerce/magento-storyblok': patch
---

Drop `@graphcommerce/magento-cms` from the Storyblok example

The Storyblok example had several leftovers from a half-completed migration off Magento CMS:

- `pages/page/[...url].tsx` — a CMS page handler whose `getStaticPaths` called `getCategoryStaticPaths` (returns Magento **category** URLs). Feeding category URLs into the `cmsPage` query caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`.
- `Layout.graphql` queried `cmsBlocks(["footer_links_block"])` but the resulting prop was destructured-and-discarded in both layout components — the Footer is fully driven by Storyblok's `globalConfig`. The dead query also produced noisy GraphQL errors at build time on backends that don't have the block.
- `pages/404.tsx` rendered a Magento `cms_no_route` CMS page (with a hardcoded fallback if absent).

The Storyblok example is meant to demonstrate "all content lives in Storyblok", so these Magento-CMS dependencies were conceptually out of place. This PR removes:

- The `pages/page/[...url].tsx` route
- The `cmsBlocks` query from `Layout.graphql` and the unused destructures in `LayoutNavigation.tsx` / `LayoutMinimal.tsx`
- The Magento CMS fallback in `pages/404.tsx` (the hardcoded fallback text remains)
- `@graphcommerce/magento-cms` from `package.json`

If a project needs Magento CMS pages alongside Storyblok, it can re-add the dependency and a route — but the example should default to pure Storyblok.
