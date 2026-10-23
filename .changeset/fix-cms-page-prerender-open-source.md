---
'@graphcommerce/magento-open-source': patch
---

Fix CMS page prerender crash caused by incorrect static-paths source

`pages/page/[...url].tsx` used `getCategoryStaticPaths`, which feeds Magento **category** URLs into the `cmsPage` query. Any category URL without a matching CMS page identifier caused `getStaticProps` to return a `redirect`, which Next.js rejects during prerender — crashing `next build`.

The handler now returns `{ paths: [], fallback: 'blocking' }`. CMS pages render on first request and are ISR-cached afterwards.
