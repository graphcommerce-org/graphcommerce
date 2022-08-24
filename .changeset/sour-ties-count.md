---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/magento-category': patch
'@graphcommerce/magento-product': patch
---

Filtered category pages are now servered by a separate route with getServerSideProps. Since there are practically infinite variations of filters, it doesn't make sense to query those on a URL level and we're leveraging the backend caching possibilities.
