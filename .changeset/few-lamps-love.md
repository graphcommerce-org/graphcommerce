---
'@graphcommerce/algolia-products': patch
---

Fixed issue where if a value contains a `/` or a `,` the URL parsing would break. Those values are now replaced with `_AND_` and `_OR_` in the URL.
