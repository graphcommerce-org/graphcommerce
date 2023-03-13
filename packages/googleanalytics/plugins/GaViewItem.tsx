import { ProductPageMetaFragment } from '@graphcommerce/magento-product/components/ProductPageMeta/ProductPageMeta.gql'
import { PluginProps } from '@graphcommerce/next-config'
import { useStableObject } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { productToGtagItem } from '../events/productToGtagItem/productToGtagItem'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GaViewItem(props: PluginProps<ProductPageMetaFragment>) {
  const { Prev, price_range } = props

  const viewItem = useStableObject({
    currency: price_range.minimum_price.final_price.currency,
    value: price_range.minimum_price.final_price.value,
    items: [productToGtagItem(props)],
  })
  useEffect(() => globalThis.gtag?.('event', 'view_item', viewItem), [viewItem])

  return <Prev {...props} />
}

export const Plugin = GaViewItem
