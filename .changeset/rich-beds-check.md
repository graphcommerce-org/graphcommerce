---
'@graphcommerce/google-datalayer': patch
'@graphcommerce/googletagmanager': patch
'@graphcommerce/googleanalytics': patch
---

Solve an issue where Analytics and Tagmanager events wouldn't be sent. Split useSendEvent and sendEvent methods into two files so plugins can be correctly applied to each.
