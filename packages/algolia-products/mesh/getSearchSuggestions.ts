import type { MeshContext, SearchSuggestion } from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { getSearchSuggestionsInput, getSuggestionsIndexName } from './getSearchSuggestionsInput'

export async function getSearchSuggestions(
  search: string,
  context: MeshContext,
): Promise<SearchSuggestion[]> {
  const suggestions = await context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: getSuggestionsIndexName(context),
      input: await getSearchSuggestionsInput(search, context),
    },
    selectionSet: /* GraphQL */ `
      {
        hits {
          __typename
          objectID
          additionalProperties
        }
      }
    `,
    context,
  })

  return filterNonNullableKeys(suggestions?.hits, []).map((hit) => ({ search: hit.objectID }))
}
