import { MeshContext, QueryproductsArgs } from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getStoreConfig } from './getStoreConfig'
import { getUserToken } from './getUserToken'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'
import { getSortedIndex } from './sortOptions'

export async function getSearchResults(
  args: QueryproductsArgs,
  context: MeshContext,
  info: GraphQLResolveInfo,
) {
  const { engine, ...filters } = args.filter ?? {}

  return context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: await getSortedIndex(context, getAlgoliaSettings(context), args.sort),
      input: {
        query: args.search ?? '',
        facets: ['*'],
        hitsPerPage: args.pageSize ? args.pageSize : 10,
        page: args.currentPage ? args.currentPage - 1 : 0,
        facetFilters: productFilterInputToAlgoliaFacetFiltersInput(filters),
        numericFilters: await productFilterInputToAlgoliaNumericFiltersInput(
          getStoreConfig(context),
          filters,
        ),

        clickAnalytics: true,
        analytics: true,

        userToken: getUserToken(context),
        enablePersonalization: true,
        personalizationImpact: 50,
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
  })
}
