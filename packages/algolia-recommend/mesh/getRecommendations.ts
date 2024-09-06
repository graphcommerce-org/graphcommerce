import { MeshContext, ProductInterface } from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { getRecommendationsInput } from './getRecommendationsInput'
import { recommendHitToMagentoProduct } from './recommendHitToMagentoProduct'
import { algoliaHitToMagentoProduct, ProductsItemsItem } from '@graphcommerce/algolia-mesh'
import { getStoreConfig } from '@graphcommerce/algolia-mesh/mesh/getStoreConfig'

export async function getRecommendations(
  context: MeshContext,
  info: GraphQLResolveInfo,
  objectId: string,
  recommendType: string,
): Promise<ProductsItemsItem[]> {
  const recommendItems = await context.algoliaRecommend.Query.algolia_getRecommendations({
    args: {
      input: getRecommendationsInput(context, objectId, recommendType),
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

  const items: ProductsItemsItem[] = []
  const config = await getStoreConfig(context)
  recommendItems?.results.map((result) =>
    result?.hits.forEach((hit) => {
      if (hit) {
        const item = algoliaHitToMagentoProduct(hit, config, 0, context, info)
        if (item) {
          items.push(item)
        }
      }
    }),
  )

  return items
}
