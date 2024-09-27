import { ProductsItemsItem } from '@graphcommerce/algolia-mesh'
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
function isAlgoliaResponse<T extends object>(root: T): root is T & { uid: string } {
  return 'uid' in root
}
function argsFromKeysInput(keys, args, context) {
  const body = keys
    .map(
      (key) =>
        ({
          [key.keyInput]: {
            model: inputToModel[key.keyInput as string],
            indexName: getIndexName(context),

            ...args,
            objectID: key.objectId,
          },
        }) as unknown as AlgoliarecommendationsRequest_Input,
    )
    .filter(nonNullable)

  const returnObject = { input: { requests: body } }

  return returnObject
}
export async function getRecommendations<
  K extends keyof AlgoliarecommendationsRequest_Input,
  Input extends AlgoliarecommendationsRequest_Input[K],
  R,
>(
  root: ProductsItemsItem,
  keyInput: K,
  args: Simplify<Omit<NonNullable<Input>, 'indexName' | 'model'>>,
  context: MeshContext,
  info: GraphQLResolveInfo,
  mapper: (hit: AlgoliarecommendationsHit) => R,
) {
  if (!isAlgoliaResponse(root)) {
    return []
  }
  return (
    (await context.algoliaRecommend.Query.algolia_getRecommendations({
      key: { keyInput, objectId: atob(root.uid) },
      argsFromKeys: (keys) => argsFromKeysInput(keys, args, context),
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
