# Plugins GraphQL

GraphCommerce's GraphQL plugin system allows you to extend GraphCommerce in a
plug-and-play manner. Install a new package and the queries will be extended at
the right places.

## What problem are we solving?

Without plugins it becomes complex to extend GraphQL queries and you'd probably
need to overfetch in lots of places by doing additional queries.

For example, to render additional attributes on the product listing, it was
necessary to modify a GraphQL query and know all the points the query is used.

The query below is inside the
[@graphcomemrce/magento-product](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-product/components/ProductList/ProductList.graphql)
package and therefor it is not possible to modify:

```graphql
query ProductList(
  $pageSize: Int = 24
  $currentPage: Int = 1
  $filters: ProductAttributeFilterInput = {}
  $sort: ProductAttributeSortInput = {}
  $search: String = ""
) {
  products(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filters
    sort: $sort
    search: $search
  ) {
    # Simplified from the original query
    items {
      __typename
      uid
      ...ProductListItem
    }
  }
}

# Fragment used for a ProductListItem used when rendering any listing
fragment ProductListItem on ProductInterface {
  uid
  ...ProductLink
  sku
  name
  small_image {
    ...ProductImage
  }
  price_range {
    minimum_price {
      ...ProductListPrice
    }
  }
}
```

## How to modify an existing query?

Fragments inside GraphCommerce allows you to inject our own fields in the
fragments.

```graphql
fragment MyCustomFragment on ProductInterface
@inject(into: ["ProductListItem"]) {
  my_custom_attribute
}
```

This will add the field to the `ProductListItem` fragment. After codegen has
been ran you will see that `my_custom_attribute` is also now present in
`ProductListItem.gql.ts` and `ProductList.gql.ts`.
