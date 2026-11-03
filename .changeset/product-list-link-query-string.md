---
'@graphcommerce/magento-product': patch
---

The links of a product list leave out the query string of the request. For `/shoes?gclid=abc`, the links were `/shoes?gclid=abc/page/2`, and crawlers followed them without end.
