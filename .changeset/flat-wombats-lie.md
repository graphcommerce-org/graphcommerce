---
"@graphcommerce/google-datalayer": patch
"@graphcommerce/googletagmanager": patch
"@graphcommerce/googleanalytics": patch
---

Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events.
