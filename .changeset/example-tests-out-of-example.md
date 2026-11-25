---
'@graphcommerce/magento-graphcms': patch
---

Fix `next build` in a project that starts from `magento-graphcms`: the type check stopped with `Cannot find module 'vitest'` in two tests of the monorepo. If your project has `__tests__/checkoutAdded.test.ts` or `graphql/ProductPage2.test.ts`, delete these files.
