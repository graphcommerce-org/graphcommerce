import { MeshContext, QueryproductsArgs } from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getRecommendationsInput } from './getRecommendationsInput'

export async function getRecommendations(
  args: QueryproductsArgs,
  context: MeshContext,
  info: GraphQLResolveInfo,
  objectId: string,
  recommendType: string,
) {
  return context.algoliaRecommend.Query.algolia_getRecommendations({
    args: {
      input: await getRecommendationsInput(args, context, objectId, recommendType),
    },
    selectionSet: /* GraphQL */ `
      {
        results {
          nbHits
          hits {
            ... on AlgoliarecommendHit {
              objectID
              additionalProperties
            }
          }
        }
      }
    `,
    context,
    info,
  })
}
