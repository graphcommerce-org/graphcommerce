import { traverseSelectionSet, type Resolvers } from '@graphcommerce/graphql-mesh'
import { algoliaFacetsToAggregations, getCategoryList } from './algoliaFacetsToAggregations'
import { algoliaHitToMagentoProduct } from './algoliaHitToMagentoProduct'
import { algoliaHitsToSuggestions } from './algoliaHitsToSuggestions'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getAttributeList } from './getAttributeList'
import { getGroupId } from './getGroupId'
import { getSearchSuggestions } from './getSearchSuggestions'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'
import { getSortedIndex, sortingOptions } from './sortOptions'
import { nonNullable } from './utils'

export const resolvers: Resolvers = {
  Query: {
    products: async (root, args, context, info) => {
      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.products({ root, args, context, info })

      const { engine, ...filters } = args.filter ?? {}

      const onlySuggestions =
        traverseSelectionSet(info.operation.selectionSet, 'products.!suggestions').selections
          .length === 0

      // We've got a early bailout here to avoid unnecessary Algolia queries
      if (onlySuggestions) {
        return { suggestions: await getSearchSuggestions(context, args.search ?? '') }
      }

      const [storeConfig, attributeList, categoryList, settings] = await Promise.all([
        getStoreConfig(context),
        getAttributeList(context),
        getCategoryList(context),
        getAlgoliaSettings(context),
      ])

      const options = sortingOptions(settings, attributeList, context)
      const indexName = getSortedIndex(context, args.sort, options, settings)

      const [searchResults, suggestions] = await Promise.all([
        await context.algolia.Query.algolia_searchSingleIndex({
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
        }),
        await getSearchSuggestions(context, args.search ?? ''),
      ])

      return {
        items: (searchResults?.hits ?? [])
          ?.filter(nonNullable)
          .map((hit) => algoliaHitToMagentoProduct(hit, storeConfig, getGroupId(context))),
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
        suggestions,
        total_count: searchResults?.nbHits,
        sort_fields: { default: 'relevance', options: Object.values(options) },
      }
    },
  },
}
