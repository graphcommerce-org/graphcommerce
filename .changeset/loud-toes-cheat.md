---
'@graphcommerce/graphql': patch
---

Do not recreate client cache when initialized once, fixes issue where the localStorage wasn't updated yet when a new page is loaded.
