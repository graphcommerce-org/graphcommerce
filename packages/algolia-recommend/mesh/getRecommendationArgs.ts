import { getSearchResultsInput } from '@graphcommerce/algolia-mesh'
import {
  QueryproductsArgs,
  MeshContext,
  AlgoliasearchParamsObject_Input,
  AlgoliaLookingSimilarInput,
} from '@graphcommerce/graphql-mesh'

export async function getRecommendationQueryInput(
  args: QueryproductsArgs,
  context: MeshContext,
): Promise<AlgoliasearchParamsObject_Input> {
  const queryParameters = await getSearchResultsInput(args, context)

  if (queryParameters?.facets) delete queryParameters.facets
  if (queryParameters?.hitsPerPage) delete queryParameters.hitsPerPage
  if (queryParameters?.page) {
    delete queryParameters.page
  }

  return queryParameters
}

export async function getRecommendationsArgs(
  root: { uid?: string },
  args: { input?: AlgoliaLookingSimilarInput | null },
  context: MeshContext,
) {
  const { fallback, filter, maxRecommendations = 8, search, threshold = 75 } = args.input ?? {}

  return {
    objectID: atob(root.uid ?? ''),
    threshold,
    maxRecommendations,
    queryParameters: await getRecommendationQueryInput(
      { filter, pageSize: maxRecommendations, search },
      context,
    ),
    fallbackParameters: await getRecommendationQueryInput(
      {
        filter: fallback?.filter,
        pageSize: maxRecommendations,
        search: fallback?.search,
        sort: fallback?.sort,
      },
      context,
    ),
  }
}
