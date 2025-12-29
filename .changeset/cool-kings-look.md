---
'@graphcommerce/magento-customer': patch
---

Migrate to default OrderItem resolver and remove useOrderCardItemImages as OrderItem now returns a product. Add a custom resolver for 2.4.5 and 2.4.6 that implements the functionality for older versions.
