import {
  MeshContext,
  Queryalgolia_searchSingleIndexArgs,
  QueryproductsArgs,
} from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'
import { getSortedIndex } from './sortOptions'

export async function getSearchResultsInput(
  args: QueryproductsArgs,
  context: MeshContext,
): Promise<Queryalgolia_searchSingleIndexArgs['input']> {
  const { engine, ...filters } = args.filter ?? {}

  return {
    query: args.search ?? '',
    facets: ['*'],
    hitsPerPage: args.pageSize ? args.pageSize : 10,
    page: args.currentPage ? args.currentPage - 1 : 0,
    facetFilters: productFilterInputToAlgoliaFacetFiltersInput(filters),
    numericFilters: await productFilterInputToAlgoliaNumericFiltersInput(
      getStoreConfig(context),
      filters,
    ),
  }
}

export async function getSearchResults(
  args: QueryproductsArgs,
  context: MeshContext,
  info: GraphQLResolveInfo,
) {
  return context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: await getSortedIndex(context, getAlgoliaSettings(context), args.sort),
      input: await getSearchResultsInput(args, context),
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
  })
}
