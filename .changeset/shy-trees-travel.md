---
'@graphcommerce/magento-customer': minor
---

Added support X-Magento-Cache-Id to allow Varnish to cache requests that are made in the browser while users are logged in. For example the products query can now be cached for logged in users. Functionality can be disabled by setting `customerXMagentoCacheIdDisable: true` in your configuration.
