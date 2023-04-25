---
'@graphcommerce/magento-customer': patch
---

The customer's token would be invalidated if any authorization error occured. Now only scoped to customer queries and mutations, potentially reducing the amount of random logouts.
