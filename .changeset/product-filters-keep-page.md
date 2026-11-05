---
'@graphcommerce/magento-product': patch
---

`ProductFiltersPro` submits only when the filters differ from the current product list. The filter fields add empty filters to the form when they mount, so with `productFiltersLayout: 'SIDEBAR'` a direct load of `/shoes/page/2` or `/shoes?gclid=abc` went to `/shoes`.
