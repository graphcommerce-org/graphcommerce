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
- sortOptions
  - label
  - value

## When to use filterAttributes?

The filterAttributes configuration is used to map the filter attributes from the
Magento 2 API to Algolia API. This is needed because some of the attributes in
Algolia don't match with the indexed attributes in Algolia. We currently support
some default attributes that are Magento 2 native, which means you don't have to
add them to the filterAttributes configuration. These attributes are:

- price
- category_uid

If you want to map other attributes, you can add them to the filterAttributes
configuration. For example, if you want to map the `color` attribute, you can
add the following configuration:

```
filterAttributes: [
  {
    aggregation: 'color',
    toAlgoliaAttribute: 'color',
  },
]
```

Filling in the aggregation (Magento 2) enables this plugin to read the
aggregation properties, such as the label and the options. The
toAlgoliaAttribute (Algolia) is the attribute that is used in the Algolia index
and connects the correct values to the aggregation.

## When to use sortOptions?

You can use the sortOptions to define new sorting options inside the Algolia
plugin. The label is the name of the sorting option that is shown in the UI. The
value is the value that is used to find the sort index in the Algolia API. For
example, if you want to add a new sorting option called `Newest`, you can add
the following configuration:

```
sortOptions: [
  {
    label: 'Newest',
    value: 'newest-product-index',
  },
]
```

## What is the recommended algoliaSearchDebounceTime?

We've added a debounce time to the search feature to prevent it from being
called too frequently. This means that the search function will wait for a
specified amount of time before executing, which reduces the number of queries
sent to the Algolia API and can reduce cost. The default debounce time is 0
milliseconds for optimal responsiveness, but you can adjust it by adding the
`algoliaSearchDebounceTime` parameter to your Graphcommerce configuration as
following:

```
algoliaSearchDebounceTime: 500

```

## Add server side hydration to Algolia Search

**_NOTE:_** Server side hydration is currently not supported due to the current
requirement of `useRouter` inside this plugin. We are working on a solution to
this problem.

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
   package and the `renderToString` method from the `react-dom/server` package
   to the imports of your search page.

```
...
import { getServerState } from 'react-instantsearch-hooks-server'
import {renderToString } from 'react-dom/server'
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
+     serverState: await getServerState(<SearchContext rendersInsideNextjs={false} />, {
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

## Add Algolia indexing to Magento 2

1. Follow the algolia docs to enable the Algolia integration in Magento 2
   [here](https://www.algolia.com/doc/integration/magento-2/getting-started/quick-start/?client=php).

## Add Algolia indexing to HyGraph

1. Add the `algoliasearch` package to your project

```
yarn add algoliasearch
```

2. Add the `@hygraph/utils` package to your project

```
yarn add @hygraph/utils
```

3. Create two new api routes in your project, one for adding an entry and one
   for removing an entry from the Algolia index.

```
- pages
  - api
    - algolia
      - add.ts
      - remove.ts
```

**_NOTE:_** Both the `add.ts` and `remove.ts` files are implemented with
signature verification. This is to prevent unwanted requests to your api routes.
You can read more about signature verification for webhooks
[here](https://hygraph.com/blog/introducing-signed-webhooks).

4. The following code is an example of how the `add.ts` file could look like.
   This file is responsible for adding an entry to the Algolia index.

```ts
import { addHygraphRecord } from '@graphcommerce/algolia-search'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) =>
  addHygraphRecord(req, res)
```

5. The following code is an example of how the `remove.ts` file could look like.
   This file is responsible for removing an entry from the Algolia index.

```ts
import { removeHygraphRecord } from '@graphcommerce/algolia-search'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) =>
  await removeHygraphRecord(req, res)
```

6. Follow the webhook setup guide to add the webhooks to your HyGraph project.

You can follow
[these](https://hygraph.com/docs/guides/webhooks/webhooks-overview#configure-webhooks)
instructions to configure the webhooks in your HyGraph project.
