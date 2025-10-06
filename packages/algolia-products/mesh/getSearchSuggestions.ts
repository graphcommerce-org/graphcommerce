import type { MeshContext, SearchSuggestion } from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { getSearchSuggestionsIndexName } from './getSearchSuggestionsIndexName'
import { getSearchSuggestionsInput } from './getSearchSuggestionsInput'

export async function getSearchSuggestions(
  search: string,
  context: MeshContext,
): Promise<SearchSuggestion[]> {
  const suggestions = await context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: getSearchSuggestionsIndexName(context),
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

  return filterNonNullableKeys(suggestions?.hits, [])
    .filter((hit) => hit.objectID !== search)
    .map((hit) => ({ search: hit.objectID }))
}
