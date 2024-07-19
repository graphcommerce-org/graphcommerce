import type { MeshContext, Resolvers } from '@graphcommerce/graphql-mesh'
import { storefrontConfigDefault } from '@graphcommerce/next-ui/server'
import { algoliaFacetsToAggregations, getCategoryList } from './algoliaFacetsToAggregations'
import { algoliaHitToMagentoProduct } from './algoliaHitToMagentoProduct'
import { getAttributeList } from './getAttributeList'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'
import { nonNullable } from './utils'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getSortedIndex, sortingOptions } from './sortOptions'

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.products({ root, args, context, info })

      const { engine, ...filters } = args.filter ?? {}

      const [storeConfig, attributeList, categoryList, settings] = await Promise.all([
        getStoreConfig(context),
        getAttributeList(context),
        getCategoryList(context),
        getAlgoliaSettings(context),
      ])

      const options = sortingOptions(settings, attributeList, context)
      const indexName = getSortedIndex(context, args.sort, options, settings)

      const searchResults = await context.algolia.Query.algolia_searchSingleIndex({
        root,
        args: {
          indexName,
          input: {
            query: args.search ?? '',
            facets: ['*'],
            hitsPerPage: args.pageSize ? args.pageSize : 10,
            page: args.currentPage ? args.currentPage - 1 : 0,
            facetFilters: productFilterInputToAlgoliaFacetFiltersInput(filters),
            numericFilters: productFilterInputToAlgoliaNumericFiltersInput(storeConfig, filters),
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
      })

      const hits = (searchResults?.hits ?? [])?.filter(nonNullable)

      return {
        items: hits.map((hit) => algoliaHitToMagentoProduct(hit, storeConfig)),
        aggregations: algoliaFacetsToAggregations(
          searchResults?.facets,
          attributeList,
          storeConfig,
          categoryList,
        ),
        page_info: {
          current_page: (searchResults?.page ?? 0) + 1,
          page_size: searchResults?.hitsPerPage,
          total_pages: searchResults?.nbPages,
        },
        suggestions: [],
        total_count: searchResults?.nbHits,
        sort_fields: { default: 'relevance', options: Object.values(options) },
      }
    },
  },
}
