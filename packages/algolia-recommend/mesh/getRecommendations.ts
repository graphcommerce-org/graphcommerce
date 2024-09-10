import { getIndexName } from '@graphcommerce/algolia-mesh/mesh/getIndexName'
import type {
  AlgoliarecommendationsRequest_Input,
  MeshContext,
  AlgoliarecommendationsHit,
} from '@graphcommerce/graphql-mesh'
import { nonNullable } from '@graphcommerce/next-ui'
import type { GraphQLResolveInfo } from 'graphql'
import type { Simplify } from 'type-fest'

const inputToModel = {
  Trending_items_Input: 'trending_items' as const,
  Trending_facet_values_Input: 'trending_facets' as const,
  Frequently_bought_together_Input: 'bought_together' as const,
  Looking_similar_Input: 'looking_similar' as const,
  Related_products_Input: 'related_products' as const,
}

export async function getRecommendations<
  K extends keyof AlgoliarecommendationsRequest_Input,
  Input extends AlgoliarecommendationsRequest_Input[K],
  R,
>(
  keyInput: K,
  args: Simplify<Omit<NonNullable<Input>, 'indexName' | 'model'>>,
  context: MeshContext,
  info: GraphQLResolveInfo,
  mapper: (hit: AlgoliarecommendationsHit) => R,
) {
  return (
    (await context.algoliaRecommend.Query.algolia_getRecommendations({
      key: keyInput,
      argsFromKeys: (keys) => ({
        input: {
          requests: keys
            .map(
              (key) =>
                ({
                  [key]: {
                    model: inputToModel[key as string],
                    indexName: getIndexName(context),
                    ...args,
                  },
                }) as unknown as AlgoliarecommendationsRequest_Input,
            )
            .filter(nonNullable),
        },
      }),
      valuesFromResults: (res, keys) =>
        keys
          .map((_key, index) => res?.results[index])
          .map((r) => r?.hits.map((hit) => hit && mapper(hit)).filter(nonNullable)) ?? null,
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
    })) ?? null
  )
}
