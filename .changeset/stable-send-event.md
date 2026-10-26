---
'@graphcommerce/google-datalayer': patch
---

`useSendEvent` returns the same `sendEvent` function at each render. It returned a new function at each render, so a product page sent `view_item` once per render.
