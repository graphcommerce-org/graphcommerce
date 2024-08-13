import {
  MeshContext,
  Queryalgolia_searchSingleIndexArgs,
  QueryproductsArgs,
} from '@graphcommerce/graphql-mesh'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'

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
