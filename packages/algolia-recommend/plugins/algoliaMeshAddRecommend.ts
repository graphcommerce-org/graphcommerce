import type {
  algoliaHitToMagentoProduct as algoliaHitToMagentoProductType,
  ProductsItemsItem,
} from '@graphcommerce/algolia-mesh'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { getRecommendations } from '../mesh/getRecommendations'
import { MeshContext, ProductInterface } from '@graphcommerce/graphql-mesh'
import { GraphQLResolveInfo } from 'graphql'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-mesh',
  ifConfig: 'algolia.recommendEnabled',
}

export const algoliaHitToMagentoProduct: FunctionPlugin<
  typeof algoliaHitToMagentoProductType
> = async (
  prev,
  hit,
  storeConfig,
  customerGroup,
  context: MeshContext,
  info: GraphQLResolveInfo,
  nested: boolean,
) => {
  const result: ProductsItemsItem | null = prev(
    hit,
    storeConfig,
    customerGroup,
    context,
    info,
    true,
  )
  if (nested) {
    return result
  }

  const objectId: string = hit.objectID
  if (result && 'related_products' in result) {
    const test = await getRecommendations(context, info, objectId, 'related_products')
    result.related_products = [
      {
        price_range: { minimum_price: { final_price: {}, regular_price: {} }, maximum_price: null },
        rating_summary: 0,
        review_count: 0,
        uid: 'test',
        redirect_code: 0,
        reviews: { page_info: {}, items: [] },
      },
    ]
    result.upsell_products = []

    // related_products?: Maybe<Array<Maybe<_RefType['ProductInterface']>>>,
  }

  return result
}
