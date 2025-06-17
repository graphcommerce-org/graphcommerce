# @graphcommerce/algolia-products

## 9.1.0-canary.39

## 9.1.0-canary.38

### Patch Changes

- [`a4de6ba`](https://github.com/graphcommerce-org/graphcommerce/commit/a4de6ba35d639fd6a7653463c2e26089d47842d0) - Solve issue where recommendations couldn't be retrieved ([@paales](https://github.com/paales))

## 9.1.0-canary.37

## 9.1.0-canary.36

### Patch Changes

- [`90e8850`](https://github.com/graphcommerce-org/graphcommerce/commit/90e885059b0203a8802e5ab753ac061b079ebcd6) - Support multiple currency displays from algolia ([@paales](https://github.com/paales))

## 9.1.0-canary.35

## 9.1.0-canary.34

### Patch Changes

- [`08f9883`](https://github.com/graphcommerce-org/graphcommerce/commit/08f98833019e726759194a3c1492052f2df052fa) - Correctly detect numeric values from the backend. ([@paales](https://github.com/paales))

## 9.1.0-canary.33

## 9.1.0-canary.32

### Patch Changes

- [#2516](https://github.com/graphcommerce-org/graphcommerce/pull/2516) [`edd9be6`](https://github.com/graphcommerce-org/graphcommerce/commit/edd9be6cbb37e7da99cc2e74ac269f0b7ddfaaaa) - feat(GCOM-1585): normalize input values from Algolia to schema compliant values ([@FrankHarland](https://github.com/FrankHarland))

## 9.1.0-canary.31

## 9.1.0-canary.30

## 9.1.0-canary.29

### Minor Changes

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4981ada`](https://github.com/graphcommerce-org/graphcommerce/commit/4981ada47eae866a003d511f80296f79c9c8b343) - Added support for Algolia's facetOrdering which allows you to change the presented filters based on rules. ([@paales](https://github.com/paales))

### Patch Changes

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4f9ddb8`](https://github.com/graphcommerce-org/graphcommerce/commit/4f9ddb820494a89a6ae37df6e2befa59910330b4) - Updated Algolia to the latest version of the spec. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`75431c2`](https://github.com/graphcommerce-org/graphcommerce/commit/75431c22792bf7e4c95cd4c7c80aae5d0e77ee10) - Updated Algolia docs for search suggestions and used a different naming scheme where baseIndex+suggestionsSuffix is used (default that algolia suggests). ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4f9ddb8`](https://github.com/graphcommerce-org/graphcommerce/commit/4f9ddb820494a89a6ae37df6e2befa59910330b4) - Fixed issue where if a value contains a `/` or a `,` the URL parsing would break. Those values are now replaced with `_AND_` and `_OR_` in the URL. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4f9ddb8`](https://github.com/graphcommerce-org/graphcommerce/commit/4f9ddb820494a89a6ae37df6e2befa59910330b4) - Moved Customer group_id resolver to magento-graphql-rest package where it should belong. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`0df56d8`](https://github.com/graphcommerce-org/graphcommerce/commit/0df56d8cbfdd2e6588946e5bd58b9a1c49a000aa) - Solve issue where the customer group specific price index wasn't used and added warnings to be able to debug the issue. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`c9ac114`](https://github.com/graphcommerce-org/graphcommerce/commit/c9ac1142cb92394eb32dc4a6d3944a1707b1b4e2) - Allow returning the algolia index name that is being searched ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`a026714`](https://github.com/graphcommerce-org/graphcommerce/commit/a026714ac0373b666de2cee43c3c5dba58cd81e4) - Solve issue where used configurations might not be scoped to the correct store. Move caching to the mesh cache and scope per store. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`2933775`](https://github.com/graphcommerce-org/graphcommerce/commit/29337755dd75321e69fe96822b51da12d06fda3a) - Solve issue where algolia would return a full product URL instead of only the pathname of the given URL from Magento ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4f9ddb8`](https://github.com/graphcommerce-org/graphcommerce/commit/4f9ddb820494a89a6ae37df6e2befa59910330b4) - Solve issue where the generated bucket for price aggregations didn’t contain the correct values. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4f9ddb8`](https://github.com/graphcommerce-org/graphcommerce/commit/4f9ddb820494a89a6ae37df6e2befa59910330b4) - Solve issue where some values wouldn’t be correctly flattened. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`4981ada`](https://github.com/graphcommerce-org/graphcommerce/commit/4981ada47eae866a003d511f80296f79c9c8b343) - Solve issue where Algolia didn't properly handle visibility as the attribute wasn't filterable, it automatically detects when there is a visibility attribute and uses that for filtering. ([@paales](https://github.com/paales))

- [#2525](https://github.com/graphcommerce-org/graphcommerce/pull/2525) [`b266ec9`](https://github.com/graphcommerce-org/graphcommerce/commit/b266ec99e09a669a8e39478f8e4412cf1275e196) - Make sure the short_description and description can be properly returned when retrieved via an Algolia query ([@paales](https://github.com/paales))

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

### Patch Changes

- [#2494](https://github.com/graphcommerce-org/graphcommerce/pull/2494) [`fd824d4`](https://github.com/graphcommerce-org/graphcommerce/commit/fd824d41674d92a42bb7f354214d2b367a7beac2) - Solve issue when creating an account the group_id would be requested but there wansn't a token available to retrieve the group_id. ([@Renzovh](https://github.com/Renzovh))

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

## 9.0.0

### Major Changes

- [#2336](https://github.com/graphcommerce-org/graphcommerce/pull/2336) [`95ce63c`](https://github.com/graphcommerce-org/graphcommerce/commit/95ce63cd32463835239ba959734cdaf1aa7f3f7b) - Algolia: Added search suggestions ([@Renzovh](https://github.com/Renzovh))

- [#2309](https://github.com/graphcommerce-org/graphcommerce/pull/2309) [`9c1110e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c1110ed018139dec7e7183f783208c158ee7ead) - Algolia: Magento 2 implemented as a GraphQL Mesh resolver: Allows full integration without modying any frontend components. ([@Renzovh](https://github.com/Renzovh))

- [#2377](https://github.com/graphcommerce-org/graphcommerce/pull/2377) [`56fcc45`](https://github.com/graphcommerce-org/graphcommerce/commit/56fcc45b60e43574c64fcdd7b02f8062d677e250) - Algolia: Integrated product queries into graphql-mesh. Provides fast and accurate searches, that can be personalised via magento-algolia and its algolia dashboard ([@Renzovh](https://github.com/Renzovh))

### Patch Changes

- [#2385](https://github.com/graphcommerce-org/graphcommerce/pull/2385) [`44f18b5`](https://github.com/graphcommerce-org/graphcommerce/commit/44f18b5a8986935728f7147d6f506dd1376fd594) - Algolia: Added support for Adobe Commerce for Algolia. ([@paales](https://github.com/paales))

- [#2334](https://github.com/graphcommerce-org/graphcommerce/pull/2334) [`3140735`](https://github.com/graphcommerce-org/graphcommerce/commit/3140735a8a49f8bebcbfde4e581515884446e05d) - Algolia: Added support for customer group pricing in Algolia. ([@Renzovh](https://github.com/Renzovh))

- [#2417](https://github.com/graphcommerce-org/graphcommerce/pull/2417) [`743e7e2`](https://github.com/graphcommerce-org/graphcommerce/commit/743e7e275c8f0bfe32a5240c08eed92120085cc0) - Algolia: Prevent errors by returning string instead of array ([@Renzovh](https://github.com/Renzovh))
