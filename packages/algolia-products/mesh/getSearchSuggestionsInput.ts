import type { MeshContext, Queryalgolia_searchSingleIndexArgs } from '@graphcommerce/graphql-mesh'
import { algolia } from '@graphcommerce/next-config/config'

export function isSuggestionsEnabled() {
  return Boolean(algolia.suggestionsSuffix)
}

export async function getSearchSuggestionsInput(
  search: string,
  context: MeshContext,
): Promise<Queryalgolia_searchSingleIndexArgs['input']> {
  return {
    query: search,
    hitsPerPage: 5,
  }
}
