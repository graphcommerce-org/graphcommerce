---
"@graphcommerce/graphql": patch
---

When loading a page, always create a new graphql client, so that cache isn't shared for each request, causing an unnecessary large page size.
