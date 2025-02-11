---
'@graphcommerce/magento-graphql': patch
---

Magento <= 2.4.6: Solve issue where GraphCommerce's schema compatibility layer would define fields to be always return a value while they would never causing runtime errors which are hard to catch.
