# Implementing Advanced Search with Algolia in GraphCommerce

The need for fast, relevant, and personalized search experiences has become
paramount. GraphCommerce, This integration offers developers a robust solution
to enhance search capabilities while maintaining the flexibility and performance
that GraphCommerce is known for.

In this article, we'll dive deep into the technical aspects of implementing
Algolia in GraphCommerce, exploring the architecture, key components, and best
practices for leveraging this powerful integration.

The Algolia integration in GraphCommerce is designed with a clear separation
between the GraphQL layer and the frontend implementation. This architecture
allows for seamless integration with existing GraphCommerce setups while
providing the flexibility to customize and extend functionality as needed.

The is composed of five packages:

- `@graphcommerce/algolia-products`
- `@graphcommerce/algolia-categories`
- `@graphcommerce/algolia-insights`
- `@graphcommerce/algolia-personalization`
- `@graphcommerce/algolia-recommend`

## Installation and configuration of Algolia for GraphCommerce

### Preparation

To integrate Magento's product catalog with GraphCommerce, you need to set up
your Algolia indexes. This is typically done using the Magento 2 Algolia module,
which handles the synchronization of product and category data.

1. Setup the fields that you want to index in algolia
   `Stores > configuration > Algolia Search > Products > Products`
2. Configure your aggregations/filters, make sure that the aggregation fields
   are also indexed in step 2
   `Stores > Configuration > Algolia Search > Instant Search Results Page > Facets`
3. Make sure the aggregations fields are made filterable(Use in layerd
   Navigation), so the attributeList query can retrieve the labels.
   `Stores > Products > Attributes`
4. To configure sorting options, enable Virtual Replica's.
   `Stores > Configuration > Algolia Search > Instant Search Results Page > Use Virtual Replica`

### @graphcommerce/algolia-products

After this package is installed and configured the search is automatically
replaced by Algolia's search.

This package is responsible for integrating Algolia's search functionality into
GraphCommerce's GraphQL layer. It includes several key components:

- **Search Result Mapping**: Converts Algolia search hits to Magento-compatible
  product objects.
- **Facet Handling**: Transforms Algolia facets into Magento-style aggregations
  for consistent filtering.
- **Query Input Preparation**: Prepares search inputs to align with Algolia's
  query structure.

Find current version of your `@graphcommerce/next-ui` in your package.json. And
run `yarn add @graphcommerce/algolia-products@9.0.0` (replace 9.0.0 with the
same version as the `@graphcommerce/next-ui`)

To enable Algolia in your GraphCommerce project, you'll need to add the
necessary configuration to your `graphcommerce.config.js` file:

```ts
module.exports = {
  // Other configuration...
  algolia: {
    // Configure your Algolia application ID.
    // Stores > Configuration > Algolia Search > Credentials and Basic Setup > Application ID
    applicationId: 'SAME_AS_MAGENTO',

    // Configure your Algolia Search Only API Key.
    // Stores > Configuration > Algolia Search > Credentials and Basic Setup > Search-only (public) API key
    searchOnlyApiKey: 'SAME_AS_MAGENTO',

    // Stores > Configuration > Algolia Search > Credentials and Basic Setup > Index name prefix
    indexNamePrefix: 'SAME_AS_MAGENTO',

    // By default the catalog will not use algolia. Set this to true to enable Algolia for the catalog.
    catalogEnabled: true,

    // Enable Algolia customer group pricing.
    // Please be aware that personalization needs to be enabled as well to make this work.
    customerGroupPricingEnabled: true,
  },
}
```

When writing your own product queries, you can set the engine to `algolia` to
use Algolia's search.

```graphql
query AlgoliaProducts {
  products(filter: { engine: { eq: "algolia" } }) {
    items {
      name
    }
  }
}
```

See the
[algoliaHitToMagentoProduct](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-products/mesh/algoliaHitToMagentoProduct.ts)
for all the fields that are returned.

### @graphcommerce/algolia-categories

This package is responsible for integrating Algolia's category search
functionality into GraphCommerce's GraphQL layer.

We currenly do not support replacing the whole category tree with Algolia's
categories, because only a reduced set of fields are indexed to algolia.

When writing your own category queries, you can set the engine to `algolia` to
use Algolia's search.

```graphql
query AlgoliaCategories {
  categories(filters: { engine: { eq: "algolia" } }) {
    items {
      name
      breadcrumbs {
        category_name
      }
    }
  }
}
```

See the
[algoliaHitToMagentoCategory](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/algolia-categories/mesh/algoliaHitToMagentoCategory.ts)
for all the fields that are returned.

### @graphcommerce/algolia-insights

This package implements Algolia's insights features, which are used to track
user interactions and improve search relevance. These events are crucial for
enabling features like NeuralSearch, Dynamic Re-Ranking, Query Categorization,
Analytics, A/B Testing, Recommend, and Personalization.

1. When installed the feature is automatically enabled.
2. Browse the site and verify that events are being logged in the Algolia
   dashboard. You can check this in the Event Debugger:
   `Data Sources > Events > Debugger`.

The events as described in
[Algolia's event types page](https://www.algolia.com/doc/guides/sending-events/concepts/event-types)
are sent to Algolia from the codebase.

The event flow implemented is as follows:

1. When a user sees a product on the screen (IntersectionObserver) the
   `viewedObjectIDs`/`viewedObjectIDsAfterSearch` is send.
2. When a user views a list of products the `viewedFilters`/`clickedFilters` are
   send.
3. When a user clicks on a product the
   `clickedObjectIDs`/`clickedObjectIDsAfterSearch` is send.
4. When a user adds a product to the cart the
   `addedToCartObjectIDs`/`addedToCartObjectIDsAfterSearch` is send. We
   automatically track where each item in the cart originated form. We track
   every item in the cart and match them to the original query that was used to
   find them.
5. When a user purchases a product the
   `purchasedObjectIDs`/`purchasedObjectIDsAfterSearch` is send. We
   automatically track where each item in the purchase originated form. We track
   every item in the purchase and match them to the original query that was used
   to find them.

Note: The `convertedObjectIds`/`convertedObjectIDsAfterSearch` are not
implemented, they are a simplified version of the
`addedToCartObjectIDs`/`addedToCartObjectIDsAfterSearch`

The `useSendAlgoliaEvent` hook in `@graphcommerce/algolia-insights` is
responsible for sending these events to Algolia.

### @graphcommerce/algolia-personalization

This package requires insights to be sent to Algolia for them to be able to
create personalized queries. Once you've collected several events, set up
personalization strategies in the Algolia dashboard under
`Enhance > Personalization`.

This package implements Algolia's personalization features, including:
Personalized search results and User token management for consistent
identification

Note: This package is optional because this will increase the amount of API
calls send to Algolia which can increase your costs when viewing lists of
products that otherwise are static like related products, category queries etc.

### @graphcommerce/algolia-recommend

This package requires insights to be sent to Algolia for them to be able to
create recommendations. Once you've collected several events, set up
recommendation strategies in the Algolia dashboard under `Recommend > Models`.

This package implements Algolia's recommendation features, including:

- Related products
- Frequently bought together
- Similar looking items

The recommend package can replace various sections of Magento's default fields.
So this can be a drop-in replacement. You can configure which fields to replace
by updating your `graphcommerce.config.js`:

```ts
module.exports = {
  algolia: {
    lookingSimilar: 'UPSELL_PRODUCTS',
    frequentlyBoughtTogether: 'CROSSSELL_PRODUCTS',
    relatedProducts: 'RELATED_PRODUCTS',
  },
}
```

Besides this the features are also available as separate fields on products:

```graphql
query AlgoliaProducts {
  products(filter: { engine: { eq: "algolia" } }) {
    items {
      name
      algolia_looking_similar {
        name
      }
      algolia_related_products {
        name
      }
      algolia_frequently_bought_together {
        name
      }
    }
  }
}
```

## Multi-store and Multi-language Support

The Algolia integration in GraphCommerce supports multi-store and multi-language
setups out of the box. It uses the indexes created by the Magento 2 Algolia
module.

## Additional Configuration

### Sorting Options

To configure sorting options for your Algolia-powered search, you need to enable
Virtual Replicas in your Magento 2 Algolia module configuration:

1. Navigate to
   `Stores > Configuration > Algolia Search > Instant Search Results Page`
2. Enable the "Use Virtual Replica" option

This allows you to define different sorting options, each of which will be
treated as a separate (virtual) index in Algolia.

### Customer Group Pricing

To enable customer group pricing, make sure customers groups prices are mapped
to algolia.
`Stores > Configuration > Algolia Search > Advanced > Enable Customer Groups`.

⚠️ Warning: Catalog price rules for a specific customer group do not seem to be
indexed.It seems only: `[Product] > Advanced Pricing > Customer Group Price`
gets indexed.

Note: The GraphQL API does not expose the customer group_id by default. We're
doing an additional REST API call to get the value. This means a somewhat slower
(few hundred ms) when the Customer is loaded.

### Customization

By default `algoliaFacetsToAggregations` and `algoliaHitToMagentoProduct` are
split into it's own functions so plugins can be easily written.

## Conclusion

The Algolia integration in GraphCommerce offers a powerful toolset for
implementing advanced search and discovery features in your e-commerce
application. By leveraging the separation of concerns between the GraphQL layer
and frontend implementation, you can create a flexible, performant, and
feature-rich search experience.

As you implement and customize the Algolia integration, remember to focus on
performance, user experience, and data privacy. Regularly analyze search
analytics and user behavior to continually refine and improve your search
implementation.

For more information and detailed documentation, visit the GraphCommerce GitHub
repository and Algolia's developer documentation. Happy coding!

TODO: INSERT GRAPHIC - Diagram illustrating the architecture of Algolia
integration in GraphCommerce
