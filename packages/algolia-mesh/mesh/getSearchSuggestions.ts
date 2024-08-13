import {
  MeshContext,
  Queryalgolia_searchSingleIndexArgs,
  SearchSuggestion,
} from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { getIndexName } from './getIndexName'

export function getSuggestionsIndexName(context: MeshContext) {
  return `${getIndexName(context)}_query_suggestions`
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getSearchSuggestionsInput(
  search: string,
  context: MeshContext,
): Promise<Queryalgolia_searchSingleIndexArgs['input']> {
  return {
    query: search,
    hitsPerPage: 5,
  }
}

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
