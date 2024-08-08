import { MeshContext, SearchSuggestion } from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { getIndexName } from './getIndexName'

export function getSuggestionsIndexName(context: MeshContext) {
  return `${getIndexName(context)}_query_suggestions`
}

export async function getSearchSuggestions(
  context: MeshContext,
  search: string,
): Promise<SearchSuggestion[]> {
  const suggestions = await context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: getSuggestionsIndexName(context),
      input: { query: search, hitsPerPage: 5 },
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
