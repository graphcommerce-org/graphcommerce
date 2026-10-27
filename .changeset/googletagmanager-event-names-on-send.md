---
'@graphcommerce/googletagmanager': patch
---

The `sendEvent` plugin reads `googleEventNames` when it sends an event. It loads before `google-datalayer` defines `googleEventNames`, so it threw a `TypeError` in development.
