import { MeshContext, QueryproductsArgs } from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getIndexName } from '../getIndexName'
import { getCategoryResultsInput } from './getCategoryResultsInput'

export async function getCategoryResults(
  args: QueryproductsArgs,
  context: MeshContext,
  info: GraphQLResolveInfo,
) {
  return context.algolia.Query.algolia_searchSingleIndex({
    args: {
      indexName: getIndexName(context, 'categories'),
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
