# @graphcommerce/magento-search-overlay

## 9.1.0-canary.55

## 9.1.0-canary.54

## 9.1.0-canary.53

## 9.1.0-canary.52

## 9.1.0-canary.51

## 9.1.0-canary.50

## 9.1.0-canary.49

### Patch Changes

- [#2533](https://github.com/graphcommerce-org/graphcommerce/pull/2533) [`88abcbf`](https://github.com/graphcommerce-org/graphcommerce/commit/88abcbf011b65b0cd1235e984f5d8306256bd518) - When loading the category/search page in the case that there are no filters applied, the amount or product related queries is reduced from 2 to 1 (ProductFilters is skipped). Pagination, sorting and search terms also do not affect this. When a filter is applied we fall back to the previous functionality and do a second query to retrieve the filters.

  This did not matter when the categories/search pages were served by Magento as Magento would cache the result of the ProductFilters query. When the the catalog is served by an external service like Algolia this might be a problem.

  Implementation details: When filters are applied (e.g., filtering by color:blue), the ProductList query only returns products matching that filter, which means other filter options (like other colors) are excluded from the filter options. This behavior is expected since those other options wouldn't return any products. However, when no filters are applied, the ProductList query returns all products along with all available filter options, eliminating the need for a separate ProductFilters query. ([@paales](https://github.com/paales))

## 9.1.0-canary.48

## 9.1.0-canary.47

## 9.1.0-canary.46

## 9.1.0-canary.45

## 9.1.0-canary.44

## 9.1.0-canary.43

## 9.1.0-canary.42

## 9.1.0-canary.41

## 9.1.0-canary.40

## 9.1.0-canary.39

## 9.1.0-canary.38

## 9.1.0-canary.37

## 9.1.0-canary.36

## 9.1.0-canary.35

## 9.1.0-canary.34

## 9.1.0-canary.33

## 9.1.0-canary.32

## 9.1.0-canary.31

## 9.1.0-canary.30

## 9.1.0-canary.29

## 9.1.0-canary.28

## 9.1.0-canary.27

## 9.1.0-canary.26

## 9.1.0-canary.25

## 9.1.0-canary.24

## 9.1.0-canary.23

## 9.1.0-canary.22

## 9.1.0-canary.21

## 9.1.0-canary.20

## 9.1.0-canary.19

## 9.1.0-canary.18

## 9.1.0-canary.17

## 9.1.0-canary.16

## 9.1.0-canary.15

## 9.0.4-canary.14

## 9.0.4-canary.13

## 9.0.4-canary.12

## 9.0.4-canary.11

## 9.0.4-canary.10

## 9.0.4-canary.9

## 9.0.4-canary.8

## 9.0.4-canary.7

## 9.0.4-canary.6

## 9.0.4-canary.5

## 9.0.4-canary.4

## 9.0.4-canary.3

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0

## 9.0.1

### Patch Changes

- [#2461](https://github.com/graphcommerce-org/graphcommerce/pull/2461) [`24c68c1`](https://github.com/graphcommerce-org/graphcommerce/commit/24c68c1903d5396efee7f571a1380ffa234338fd) - Solve issue with the SearchField throwing an error in production. ([@paales](https://github.com/paales))

## 9.0.0

### Major Changes

- [#2361](https://github.com/graphcommerce-org/graphcommerce/pull/2361) [`9c3149c`](https://github.com/graphcommerce-org/graphcommerce/commit/9c3149cb7550c6bf7de4b8e3bcaabe2f6a70d5c7) - Completely new SearchOverlay package this is compatible with Magento's default search as well as any other implementation like Algolia and Adobe Sensei. ([@paales](https://github.com/paales))
