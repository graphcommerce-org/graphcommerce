# Algolia Search

Implementation of Algolia Instant Search inside Graphcommerce. Add client or
server side product, category and pages search to your project!

## Installation

1. Find current version of your `@graphcommerce/next-ui` in your package.json.
2. `yarn add @graphcommerce/algolia-search@1.2.3` (replace 1.2.3 with the
   version of the step above)

## Add config values to Graphcommerce configuration

This plugin contains different app and storefront configuration values.

App configuration values:

- algoliaApplicationId
- algoliaSearchOnlyApiKey
- algoliaSearchDebounceTime,

Storefront configuration values:

- algoliaSearchIndexConfig (containing a list of the following values)
  - searchIndex
  - filterAttributes (containing a list of the following values)
    - aggregation
    - toAlgoliaAttribute

## Add server side hydration to Algolia Search

1. Add `react-instantsearch-hooks-server` package to your project

```
yarn add react-instantsearch-hooks-server

```

or

```
npm install react-instantsearch-hooks-server
```

2. Add the new serverState property to the `SearchResultProps` type

```
type SearchResultProps = DefaultPageQuery &
  ProductListQuery &
  ProductFiltersQuery &
  CategorySearchQuery & {
   filterTypes: FilterTypes
   params: ProductListParams
+   serverState?: unknown
   }
```

3. Add the `getServerState` method from the `react-instantsearch-hooks-server`
   package to the imports of your search page

```
...
import { getServerState } from 'react-instantsearch-hooks-server'
...
```

4. Assign the result of the `getServerState` method to the `serverState`
   attribute inside of the return statement.

```
return {
    props: {
      ...(await page).data,
      ...(await products).data,
      ...(await filters).data,
      ...(await categories)?.data,
      ...(await layout)?.data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
+     serverState: await getServerState(<SearchContext />, {
+      renderToString,
+     }),
    },
    revalidate: 60 * 20,
  }
```

5. Add the `serverState` to the `SearchContext` component.

```
+ const { products, categories, params, filters, filterTypes, serverState } = props
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (!products || (products.items && products?.items?.length <= 0))

  return (
    <>
      <PageMeta
        title={
          search
            ? i18n._(/* i18n */ 'Results for ‘{search}’', { search })
            : i18n._(/* i18n */ 'Search')
        }
        metaRobots={['noindex']}
        canonical='/search'
      />

+     <SearchContext serverProps={serverState}>
```
