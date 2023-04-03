---
'@graphcommerce/magento-customer': patch
---

useOrderCardItemImages was triggered when there were no urlKeys present, causing unnessary requests to be made to the backend.
