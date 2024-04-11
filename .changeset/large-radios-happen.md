---
'@graphcommerce/google-datalayer': patch
---

Google Datalayer, Analytics and Tagmanager improvements.

- Removed `eventFormat` as we could automatically detec the correct event format and it is now the responsibility of GTM or the GTAG to handle the event format.
- Created cartItemToGoogleDatalayerItem and productToGoogleDatalayerItem for easier modifications.
