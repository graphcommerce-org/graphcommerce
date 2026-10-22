---
'@graphcommerce/graphql': patch
---

Queries that watch the cache receive the state that `createCacheReviver` restores from localStorage, so a full page load of the cart or the checkout shows the cart.
