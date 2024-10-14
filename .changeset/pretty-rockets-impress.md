---
'@graphcommerce/framer-next-pages-example': patch
'@graphcommerce/framer-scroller-example': patch
'@graphcommerce/hygraph-dynamic-rows-ui': patch
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/image-example': patch
---

When installing GraphCommerce it would install multiple versions of webpack, causing build errors: Loosen webpack dependency constraint so it installs a single version.
