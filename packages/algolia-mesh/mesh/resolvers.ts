import type { MeshContext, Resolvers } from '@graphcommerce/graphql-mesh'
import { storefrontConfigDefault } from '@graphcommerce/next-ui/server'
import { algoliaFacetsToAggregations } from './algoliaFacetsToAggregations'
import { algoliaHitToMagentoProduct } from './algoliaHitToMagentoProduct'
import { attributeList } from './attributeList'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'
import { nonNullable } from './utils'

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

function getIndexName(context: MeshContext) {
  const storeCode = getStoreHeader(context) ?? storefrontConfigDefault().magentoStoreCode
  return `${import.meta.graphCommerce.algoliaIndexNamePrefix}${storeCode}_products`
}

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.products({ root, args, context, info })

      const { engine, ...filters } = args.filter ?? {}

      const [searchResults, attrList, categoryList, storeConfig] = await Promise.all([
        context.algolia.Query.algolia_searchSingleIndex({
          root,
          args: {
            indexName: getIndexName(context),
            input: {
              query: args.search ?? '',
              facets: ['*'],
              hitsPerPage: args.pageSize ? args.pageSize : 10,
              facetFilters: productFilterInputToAlgoliaFacetFiltersInput(filters),
              numericFilters: productFilterInputToAlgoliaNumericFiltersInput(filters),
            },
          },
          selectionSet: /* GraphQL */ `
            {
              nbPages
              hitsPerPage
              page
              nbHits
              hits {
                __typename
                objectID
                additionalProperties
              }
              facets
            }
          `,
          context,
          info,
        }),
        attributeList(context, !!args.search),
        context.m2.Query.categories({
          args: { filters: {} },
          selectionSet: /* GraphQL */ `
            {
              items {
                uid
                name
                id
                position
              }
            }
          `,
          context,
        }),
        getStoreConfig(context),
      ])

      const hits = (searchResults?.hits ?? [])?.filter(nonNullable)

      return {
        items: hits.map((hit) => algoliaHitToMagentoProduct(hit, storeConfig)),
        aggregations: algoliaFacetsToAggregations(
          searchResults?.facets,
          attrList,
          storeConfig,
          categoryList,
        ),
        page_info: {
          current_page: searchResults?.page,
          page_size: searchResults?.hitsPerPage,
          total_pages: searchResults?.nbPages,
        },
        suggestions: [],
        total_count: searchResults?.nbHits,

        /**
         * TODO: Algolia Catalog.
         *
         *
         * The M2 Algolia module supports different sorting options.
         * https://www.algolia.com/doc/integration/magento-2/how-it-works/indexing/?client=php#sorting-strategies
         *
         * This means that we need to get the replicas from the algolia_getSettings query.
         *
         * Based on the selected sorting option we need to select the correct virtual replica.
         */
        sort_fields: {
          default: 'relevance',
          options: [{ label: 'Relevance', value: 'relevance' }],
        },
      }
    },
  },
}
