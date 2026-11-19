---
'@graphcommerce/next-config': patch
'@graphcommerce/hygraph-cli': patch
'@graphcommerce/prettier-config-pwa': patch
---

`@graphcommerce/next-config` and `@graphcommerce/hygraph-cli` require `dotenv` 18. `@graphcommerce/prettier-config-pwa` requires `prettier` 3.5.3: with Prettier 3.6 and later, only the last plugin formats the file, so the imports are not sorted.
