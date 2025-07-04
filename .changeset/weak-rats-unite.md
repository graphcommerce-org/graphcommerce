---
'@graphcommerce/magento-search-overlay': patch
'@graphcommerce/magento-product': patch
'@graphcommerce/magento-search': patch
---

When loading the category/search page in the case that there are no filters applied, the amount or product related queries is reduced from 2 to 1 (ProductFilters is skipped). Pagination, sorting and search terms also do not affect this. When a filter is applied we fall back to the previous functionality and do a second query to retrieve the filters.

This did not matter when the categories/search pages were served by Magento as Magento would cache the result of the ProductFilters query. When the the catalog is served by an external service like Algolia this might be a problem.

Implementation details: When filters are applied (e.g., filtering by color:blue), the ProductList query only returns products matching that filter, which means other filter options (like other colors) are excluded from the filter options. This behavior is expected since those other options wouldn't return any products. However, when no filters are applied, the ProductList query returns all products along with all available filter options, eliminating the need for a separate ProductFilters query.
