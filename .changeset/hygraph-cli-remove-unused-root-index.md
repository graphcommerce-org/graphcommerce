---
'@graphcommerce/hygraph-cli': patch
---

The package has no root `index.ts`. That file was unused and not valid TypeScript (`export const {}`), so the extractor of Lingui stopped at it.
