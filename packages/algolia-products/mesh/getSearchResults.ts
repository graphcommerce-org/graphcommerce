import type { MeshContext, QueryproductsArgs } from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getAlgoliaSettings } from './getAlgoliaSettings'
import { getSearchResultsInput } from './getSearchResultsInput'
import { getSortedIndex } from './sortOptions'

export async function getSearchResults(
  args: QueryproductsArgs,
  context: MeshContext,
  info: GraphQLResolveInfo,
) {
  return context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: await getSortedIndex(context, getAlgoliaSettings(context), args.sort),
      input: await getSearchResultsInput(args, context),
    },
    selectionSet: /* GraphQL */ `
      {
        nbPages
        hitsPerPage
        page
        queryID
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
    info,
  })
}
