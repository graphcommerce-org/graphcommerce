import { useApolloClient } from '@graphcommerce/graphql'
import {
  type AddToCartItemSelector,
  type ProductPageMeta,
  ProductPageMetaFragment,
} from '@graphcommerce/magento-product'
import { useConfigurableSelectedVariant } from '@graphcommerce/magento-product-configurable/hooks'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RecentlyViewedProductsDocument } from '../graphql/RecentlyViewedProducts.gql'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product/components/ProductPageMeta/ProductPageMeta'

type PluginType = ReactPlugin<typeof ProductPageMeta, AddToCartItemSelector>

function ViewHandling(props: { product: ProductPageMetaFragment }) {
  const { product } = props
  const client = useApolloClient()
  const variant = useConfigurableSelectedVariant({ url_key: product?.url_key, index: 0 })
  const { events } = useRouter()

  const registerView = useEventCallback(async () => {
    const recentlyViewed = await client.query({ query: RecentlyViewedProductsDocument })
    const skus = recentlyViewed.data.recentlyViewedProducts?.items ?? []

    const isValidVariant =
      (variant?.url_rewrites ?? []).length > 0 &&
      variant?.url_key &&
      import.meta.graphCommerce.configurableVariantForSimple

    const parentSku = product.sku || ''
    const sku = (isValidVariant ? variant.sku : product.sku) || ''

    const parentSkuAlreadySet = skus.some(
      (p) => p.sku === product.sku || p.parentSku === product.sku,
    )
    const skuAlreadySet = skus.some((p) => p.sku === sku)
    const skuIsLastItem = skus[skus.length - 1].sku === sku

    if (skuAlreadySet && skuIsLastItem) return

    const items = [
      // If SKU already exists in recently viewed products, replace it, else add it
      ...(skuIsLastItem || parentSkuAlreadySet
        ? skus.filter((p) => p.sku !== parentSku && p.parentSku !== parentSku)
        : skus),
      { __typename: 'RecentlyViewedProduct' as const, parentSku, sku },
    ]

    // Current SKU not yet found in recently viewed or SKU is found, but not set as last visited - add to list/update in list
    client.writeQuery({
      query: RecentlyViewedProductsDocument,
      broadcast: true,
      data: { recentlyViewedProducts: { __typename: 'RecentlyViewedProducts', items } },
    })
  })

  useEffect(() => {
    events.on('routeChangeStart', registerView)
    return () => events.off('routeChangeStart', registerView)
  }, [events, registerView])

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
