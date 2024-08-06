import type { Resolvers } from '@graphcommerce/graphql-mesh'
import { algoliaFacetsToAggregations, getCategoryList } from './algoliaFacetsToAggregations'
import { algoliaHitToMagentoProduct } from './algoliaHitToMagentoProduct'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getAttributeList } from './getAttributeList'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'
import { getSortedIndex, sortingOptions } from './sortOptions'
import { nonNullable } from './utils'
import { getSuggestionsIndexName } from './getIndexName'
import { algoliaHitsToSuggestions } from './algoliaHitsToSuggestions'

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

      const [searchResults, suggestionResults] = await Promise.all([
        await context.algolia.Query.algolia_searchSingleIndex({
          root,
          args: {
            indexName,
            input: {
              clickAnalytics: true,
              query: args.search ?? '',
              facets: ['*'],
              hitsPerPage: args.pageSize ? args.pageSize : 10,
              page: args.currentPage ? args.currentPage - 1 : 0,
              facetFilters: productFilterInputToAlgoliaFacetFiltersInput(filters),
              numericFilters: productFilterInputToAlgoliaNumericFiltersInput(storeConfig, filters),
              analytics: true,

              // userToken,
              // analytics: true,
              // enablePersonalization: true,
              // personalizationImpact:
            },
          },
          selectionSet: /* GraphQL */ `
            {
              nbPages
              hitsPerPage
              page
              queryID
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
        await context.algolia.Query.algolia_searchSingleIndex({
          root,
          args: {
            indexName: getSuggestionsIndexName(context),
            input: {
              query: args.search ?? '',

              hitsPerPage: 15,
              page: 0,
            },
          },
          selectionSet: /* GraphQL */ `
            {
              nbPages
              hitsPerPage
              page
              nbHits
              queryId
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
      ])

      const hits = (searchResults?.hits ?? [])?.filter(nonNullable)
      const sugestionsHits = (suggestionResults?.hits ?? [])?.filter(nonNullable)

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
        suggestions: algoliaHitsToSuggestions(sugestionsHits),
        total_count: searchResults?.nbHits,
        sort_fields: { default: 'relevance', options: Object.values(options) },
        algolia_queryID: searchResults?.queryID,
      }
    },
  },
}
