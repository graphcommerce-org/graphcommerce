import type { MeshContext, Queryalgolia_searchSingleIndexArgs } from '@graphcommerce/graphql-mesh'
import { getIndexName } from './getIndexName'

export function isSuggestionsEnabled() {
  return Boolean(import.meta.graphCommerce.algolia.suggestionsSuffix)
}

export function getSuggestionsIndexName(context: MeshContext) {
  return `${getIndexName(context).replace('_products', import.meta.graphCommerce.algolia.suggestionsSuffix ?? '')}`
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getSearchSuggestionsInput(
  search: string,
  context: MeshContext,
): Promise<Queryalgolia_searchSingleIndexArgs['input']> {
  return {
    query: search,
    hitsPerPage: 5,
    analytics: true,
  }
}
