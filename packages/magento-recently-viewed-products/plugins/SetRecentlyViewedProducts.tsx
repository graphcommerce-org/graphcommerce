import { useApolloClient } from '@graphcommerce/graphql'
import {
  type AddToCartItemSelector,
  type ProductPageMeta,
  ProductPageMetaFragment,
} from '@graphcommerce/magento-product'
import { useConfigurableSelectedVariant } from '@graphcommerce/magento-product-configurable/hooks'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { RecentlyViewedProductsDocument } from '../graphql/RecentlyViewedProducts.gql'
import { useRecentlyViewedSkus } from '../hooks/useRecentlyViewedSkus'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product/components/ProductPageMeta/ProductPageMeta'

type PluginType = ReactPlugin<typeof ProductPageMeta, AddToCartItemSelector>

function ViewHandling(props: { product: ProductPageMetaFragment }) {
  const { product } = props
  const { cache } = useApolloClient()
  const { skus: recentlyViewedSkus, loading } = useRecentlyViewedSkus()
  const variant = useConfigurableSelectedVariant({ url_key: product?.url_key, index: 0 })

  if (loading) {
    return null
  }

  const isValidVariant =
    (variant?.url_rewrites ?? []).length > 0 &&
    variant?.url_key &&
    import.meta.graphCommerce.configurableVariantForSimple

  const parentSku = product.sku || ''
  const sku = (isValidVariant ? variant.sku : product.sku) || ''

  const parentSkuAlreadySet = recentlyViewedSkus.some(
    (p) => p.sku === parentSku || p.parentSku === parentSku,
  )
  const skuAlreadySet = recentlyViewedSkus.some((p) => p.sku === sku)
  const skuIsLastItem =
    [...recentlyViewedSkus].sort((a, b) => (a.time > b.time ? 1 : -1))[
      recentlyViewedSkus.length - 1
    ]?.sku === sku

  if (skuAlreadySet && skuIsLastItem) {
    return null
  }

  // Current SKU not yet found in recently viewed or SKU is found, but not set as last visited - add to list/update in list
  cache.writeQuery({
    query: RecentlyViewedProductsDocument,
    broadcast: true,
    data: {
      recentlyViewedProducts: {
        __typename: 'RecentlyViewedProducts',
        items: [
          // If SKU already exists in recently viewed products, replace it, else add it
          ...(skuIsLastItem || parentSkuAlreadySet
            ? recentlyViewedSkus.filter((p) => p.sku !== parentSku && p.parentSku !== parentSku)
            : recentlyViewedSkus),
          {
            __typename: 'RecentlyViewedProduct',
            parentSku,
            sku,
            time: Date.now(),
          },
        ],
      },
    },
  })

  return null
}

const SetRecentlyViewedProducts: PluginType = (props) => {
  const { Prev, product } = props

  return (
    <>
      <ViewHandling product={product} />
      <Prev {...props} />
    </>
  )
}

export const Plugin = SetRecentlyViewedProducts
