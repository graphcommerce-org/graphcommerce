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

### Configuration

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
5. To enable custom pricing, make sure customers groups prices are mapped to
   algolia
   `Stores > Configuration > Algolia Search > Advanced > Enable Customer Groups`

### Customization

Customise the code by creating plugins on the functions you want to adjust

## Algolia for Catalog

Sorting is defined by Algolia and can not be configured per category as each
sorting option is a separate (virtual) index.

## Todo

- [] Search suggestions
- [] Category search
- [] Additional indexes
- [] Analytics
- [] Personalization
