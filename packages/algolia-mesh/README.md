# Algolia Magento 2

An implementation of Algolia through the GraphQL Mesh.

## Prerequisites

Make sure the Magento 2 module is correctly installed and working.

## Installation

1. Find current version of your `@graphcommerce/next-ui` in your package.json.
2. `yarn add @graphcommerce/address-fields-nl@9.0.0` (replace 9.0.0 with the
   version of the step above)
3. Configure the following ([configuration values](./Config.graphqls)) in your
   graphcommerce.config.js:

   ```js
   const config = {
     algoliaApplicationId: 'your-algolia-application-id', // Stores > Configuration > Algolia Search > Credentials and Basic Setup > Application ID
     algoliaIndexNamePrefix: 'default_', // Stores > Configuration > Algolia Search > Credentials and Basic Setup > Index name prefix
     algoliaSearchOnlyApiKey: 'blabla', // Stores > Configuration > Algolia Search > Credentials and Basic Setup > Search-only (public) API key
     algoliaCatalogEnabled: false, // start with search and if everything works as expected, you can move on to the catalog.
   }
   ```

## Configuration

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

### Customer Group Pricing

```js
const config = {
  algoliaCustomerGroupPricingEnabled: true,
}
```

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

By default algoliaFacetsToAggregations and algoliaHitToMagentoProduct can be
plugged in.

## Algolia for Catalog

Sorting is defined by Algolia and can not be configured per category as each
sorting option is a separate (virtual) index.

## Suggestions

To get query suggestions/autocomplete enter your Algolia dashboard > Aearch >
configure > Query Suggestions > new Query Suggestions Index. This will create a
new index which will be used for suggestions

Don't mind to use the suggestions setting in magento admin. It will create an
suggestions index but it

## Todo

- [] Search suggestions
- [] Category search
- [] Additional indexes
- [] Analytics
- [] Personalization
