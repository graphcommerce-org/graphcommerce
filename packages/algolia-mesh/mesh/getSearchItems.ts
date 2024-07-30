import {
  AlgoliasearchResponse,
  MeshContext,
  ProductAttributeFilterInput,
  QueryproductsArgs,
  RequireFields,
} from '@graphcommerce/graphql-mesh'

import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { GetStoreConfigReturn } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'

export async function getSearchItems(
  context: MeshContext,
  search: string,
  args: RequireFields<QueryproductsArgs, 'pageSize' | 'currentPage'>,
  indexName: string,
  storeConfig: GetStoreConfigReturn,
  filters: ProductAttributeFilterInput,
): Promise<AlgoliasearchResponse[]> {
  const response = await context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName,
      input: {
        query: search,
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
  })

  return filterNonNullableKeys(response) ?? []
}
