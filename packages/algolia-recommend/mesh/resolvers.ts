/* eslint-disable @typescript-eslint/require-await */
import { algoliaHitToMagentoProduct } from '@graphcommerce/algolia-mesh'
import { getGroupId } from '@graphcommerce/algolia-mesh/mesh/getGroupId'
import { getIndexName } from '@graphcommerce/algolia-mesh/mesh/getIndexName'
import { getStoreConfig } from '@graphcommerce/algolia-mesh/mesh/getStoreConfig'
import { nonNullable } from '@graphcommerce/algolia-mesh/mesh/utils'
import type {
  Algoliahit,
  AlgoliarecommendationsRequest_Input,
  AlgoliarecommendHit,
  AlgoliatrendingFacetHit,
  MeshContext,
  Resolvers,
} from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'

function isAlgoliaRecommendHit(
  hit: AlgoliarecommendHit | AlgoliatrendingFacetHit | Algoliahit | null,
): hit is Algoliahit {
  return !!hit && '__typename' in hit && hit.__typename === 'AlgoliarecommendHit'
}

function createAlgoliaRecommendationRequest<K extends keyof AlgoliarecommendationsRequest_Input>(
  keyInput: K,
  additionalArgs?: AlgoliarecommendationsRequest_Input[K],
) {
  return async (
    root: { uid: string },
    args: unknown,
    context: MeshContext,
    info: GraphQLResolveInfo,
  ) => {
    const storeConfig = await getStoreConfig(context)
    const groupId = getGroupId(context)

    const results =
      (await context.algoliaRecommend.Query.algolia_getRecommendations({
        key: keyInput,
        argsFromKeys: (keys) => ({
          input: {
            requests: keys
              .map((key): AlgoliarecommendationsRequest_Input | null => {
                const baseTypes: Omit<
                  NonNullable<
                    AlgoliarecommendationsRequest_Input[keyof AlgoliarecommendationsRequest_Input]
                  >,
                  'model'
                > = {
                  indexName: getIndexName(context),
                  threshold: 60,
                  maxRecommendations: 8,
                  ...additionalArgs,
                  // queryParameters: {},
                }

                if (key === 'Trending_items_Input')
                  return {
                    Trending_items_Input: {
                      ...baseTypes,
                      model: 'trending_items',
                      facetName: '',
                      facetValue: '',
                    },
                  }

                if (key === 'Trending_facet_values_Input')
                  return {
                    Trending_facet_values_Input: {
                      ...baseTypes,
                      model: 'trending_facets',
                      facetName: '',
                    },
                  }

                if (key === 'Frequently_bought_together_Input')
                  return {
                    Frequently_bought_together_Input: {
                      ...baseTypes,
                      model: 'bought_together',
                      objectID: atob(root.uid),
                    },
                  }

                if (key === 'Looking_similar_Input')
                  return {
                    Looking_similar_Input: {
                      ...baseTypes,
                      model: 'looking_similar',
                      objectID: atob(root.uid),
                    },
                  }

                if (key === 'Recommended_for_you_Input')
                  return {
                    Recommended_for_you_Input: {
                      ...baseTypes,
                      model: 'recommended_for_you',
                    },
                  }

                if (key === 'Related_products_Input')
                  return {
                    Related_products_Input: {
                      ...baseTypes,
                      model: 'related_products',
                      objectID: atob(root.uid),
                    },
                  }

                return null
              })
              .filter(nonNullable),
          },
        }),
        valuesFromResults: (res, keys) =>
          keys
            .map((_key, index) => res?.results[index])
            .map((r) =>
              r?.hits
                .map((hit) =>
                  hit && isAlgoliaRecommendHit(hit)
                    ? algoliaHitToMagentoProduct(hit, storeConfig, groupId)
                    : null,
                )
                .filter(nonNullable),
            ) ?? null,
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

    return results
  }
}

export const resolvers: Resolvers = {
  ConfigurableProduct: {
    // upsell_products: () => [],
    related_products: createAlgoliaRecommendationRequest('Related_products_Input'),
    // crosssell_products: createAlgoliaRecommendationRequest('Frequently_bought_together_Input'),
  },
}
