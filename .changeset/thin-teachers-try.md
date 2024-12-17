---
'@graphcommerce/graphql': patch
---

When a `usePrivateQuery` is called, only execute when there is no `PrivateQueryMaskContext` defined above.
