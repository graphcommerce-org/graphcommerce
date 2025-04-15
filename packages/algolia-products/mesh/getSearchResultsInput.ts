import type {
  AlgoliasearchParamsObject_Input,
  MeshContext,
  QueryproductsArgs,
} from '@graphcommerce/graphql-mesh'
import { getAlgoliaContext } from './getAlgoliaContext'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getStoreConfig } from './getStoreConfig'
import {
  productFilterInputToAlgoliaFacetFiltersInput,
  productFilterInputToAlgoliaNumericFiltersInput,
} from './productFilterInputToAlgoliafacetFiltersInput'

export async function getSearchResultsInput(
  args: QueryproductsArgs,
  context: MeshContext,
): Promise<AlgoliasearchParamsObject_Input> {
  const { engine, ...filters } = args.filter ?? {}

  return {
    query: args.search ?? '',
    facets: ['*'],
    hitsPerPage: args.pageSize ? args.pageSize : 10,
    page: args.currentPage ? args.currentPage - 1 : 0,
    facetFilters: productFilterInputToAlgoliaFacetFiltersInput(
      await getAlgoliaSettings(context),
      filters,
    ),
    numericFilters: await productFilterInputToAlgoliaNumericFiltersInput(
      getStoreConfig(context),
      filters,
    ),
    analytics: true,
    ruleContexts: getAlgoliaContext(filters),
  }
}
