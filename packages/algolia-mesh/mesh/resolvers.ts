import {
  AlgoliasearchResponse,
  hasSelectionSetPath,
  type Resolvers,
} from '@graphcommerce/graphql-mesh'
import type { GraphQLError, GraphQLResolveInfo } from 'graphql'
import { algoliaFacetsToAggregations, getCategoryList } from './algoliaFacetsToAggregations'
import { algoliaHitToMagentoProduct, ProductsItemsItem } from './algoliaHitToMagentoProduct'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getAttributeList } from './getAttributeList'
import { getGroupId } from './getGroupId'
import { getSearchResults } from './getSearchResults'
import { getSearchSuggestions } from './getSearchSuggestions'
import { getStoreConfig } from './getStoreConfig'
import { sortingOptions } from './sortOptions'
import { isSuggestionsEnabled } from './getSearchSuggestionsInput'

function isAlgoliaResponse<T extends object>(
  root: T,
): root is T & { algoliaSearchResults: AlgoliasearchResponse } {
  return 'algoliaSearchResults' in root
}

function hasSearchRequest(info: GraphQLResolveInfo) {
  const hasItems = hasSelectionSetPath(info.operation.selectionSet, 'products.items')
  const hasAggregations = hasSelectionSetPath(info.operation.selectionSet, 'products.aggregations')
  const hasPageInfo = hasSelectionSetPath(info.operation.selectionSet, 'products.page_info')
  const hasTotalCount = hasSelectionSetPath(info.operation.selectionSet, 'products.total_count')
  const hasSortFields = hasSelectionSetPath(info.operation.selectionSet, 'products.sort_fields')

  return Boolean(hasItems || hasAggregations || hasPageInfo || hasTotalCount || hasSortFields)
}

function hasSuggestionsRequest(info: GraphQLResolveInfo) {
  return hasSelectionSetPath(info.operation.selectionSet, 'products.suggestions')
}

function isGraphQLError(err: unknown): err is GraphQLError {
  return !!(err as GraphQLError)?.message
}

export const resolvers: Resolvers = {
  Products: {
    aggregations: async (root, _args, context) => {
      if (!isAlgoliaResponse(root)) return root.aggregations ?? null

      return algoliaFacetsToAggregations(
        root.algoliaSearchResults?.facets,
        await getAttributeList(context),
        await getStoreConfig(context),
        await getCategoryList(context),
        getGroupId(context),
      )
    },

    sort_fields: async (root, _args, context) => {
      if (isAlgoliaResponse(root)) {
        return {
          default: 'relevance',
          options: Object.values(
            sortingOptions(
              await getAlgoliaSettings(context),
              await getAttributeList(context),
              context,
            ),
          ),
        }
      }
      return root.sort_fields ?? null
    },

    total_count: (root) => {
      if (!isAlgoliaResponse(root)) return root.total_count ?? null
      return root.algoliaSearchResults?.nbHits
    },

    page_info: (root) => {
      if (!isAlgoliaResponse(root)) return root.page_info ?? null
      return {
        current_page: root.algoliaSearchResults.page + 1,
        page_size: root.algoliaSearchResults.hitsPerPage,
        total_pages: root.algoliaSearchResults.nbPages,
      }
    },

    items: async (root, args, context) => {
      if (!isAlgoliaResponse(root)) return root.items ?? null

      const items: (ProductsItemsItem | null)[] = []

      const config = await getStoreConfig(context)
      for (const hit of root.algoliaSearchResults.hits) {
        if (hit?.objectID) {
          const product = algoliaHitToMagentoProduct(hit, config, getGroupId(context))
          items.push(product)
        }
      }

      return items
    },
  },
  Query: {
    products: async (root, args, context, info) => {
      const isAgolia = (args.filter?.engine?.in ?? [args.filter?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.products({ root, args, context, info })

      const searchResultsResponse = hasSearchRequest(info)
        ? getSearchResults(args, context, info)
        : null

      const searchSuggestsions =
        isSuggestionsEnabled() &&
        hasSuggestionsRequest(info) &&
        args.search &&
        getSearchSuggestions(args.search, context)

      const searchResults = await searchResultsResponse
      if (isGraphQLError(searchResults)) {
        return context.m2.Query.products({ root, args, context, info })
      }
      return {
        algoliaSearchResults: searchResults,
        suggestions: (await searchSuggestsions) || null,
        algolia_queryID: searchResults?.queryID,
      }
    },
  },
}
