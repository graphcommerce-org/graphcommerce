import type { MeshContext, QuerycategoryListArgs } from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getCategoryResultsInput } from './getCategoryResultsInput'
import { getIndexName } from './getIndexName'

export async function getCategoryResults(
  args: QuerycategoryListArgs,
  context: MeshContext,
  info: GraphQLResolveInfo,
) {
  return context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: getIndexName(context),
      input: await getCategoryResultsInput(args),
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
