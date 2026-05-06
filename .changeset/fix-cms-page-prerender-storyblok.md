---
'@graphcommerce/magento-storyblok': patch
---

Fix two leftover Magento-CMS issues in the Storyblok example

1. **CMS page prerender crash.** `pages/page/[...url].tsx` used `getCategoryStaticPaths`, which feeds Magento **category** URLs into the `cmsPage` query. Any category URL without a matching CMS page identifier caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`. The handler now returns `{ paths: [], fallback: 'blocking' }`. CMS pages render on first request and are ISR-cached afterwards.

2. **Dead `footer_links_block` query.** `Layout.graphql` queried `cmsBlocks(identifiers: ["footer_links_block"])` but the resulting `cmsBlocks` prop was destructured-and-discarded in both `LayoutNavigation.tsx` and `LayoutMinimal.tsx` — the Footer is fully driven by Storyblok's `globalConfig`. The dead query also produced a noisy GraphQL error at build time on backends that don't have the block. Removed the query and the now-unused destructure.
