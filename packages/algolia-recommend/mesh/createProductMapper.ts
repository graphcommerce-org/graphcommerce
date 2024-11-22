import { algoliaHitToMagentoProduct } from '@graphcommerce/algolia-products'
import { getGroupId } from '@graphcommerce/algolia-products/mesh/getGroupId'
import { getStoreConfig } from '@graphcommerce/algolia-products/mesh/getStoreConfig'
import type {
  Algoliahit,
  AlgoliarecommendationsHit,
  MeshContext,
} from '@graphcommerce/graphql-mesh'

export async function createProductMapper(context: MeshContext) {
  const storeConfig = await getStoreConfig(context)
  const groupId = getGroupId(context)

  const isAlgoliaRecommendHit = (hit: AlgoliarecommendationsHit | Algoliahit): hit is Algoliahit =>
    '__typename' in hit && hit.__typename === 'AlgoliarecommendHit'

  return (hit: AlgoliarecommendationsHit) =>
    isAlgoliaRecommendHit(hit) ? algoliaHitToMagentoProduct(hit, storeConfig, groupId) : null
}
