import type { ProductPageMeta } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { productToGtagItem } from '../events/productToGtagItem/productToGtagItem'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleAnalyticsId'

/** When a product is added to the Cart, send a Google Analytics event */
function GaViewItem(props: PluginProps<React.ComponentProps<typeof ProductPageMeta>>) {
  const { Prev, product } = props
  const { price_range } = product

  const viewItem = useMemoObject({
    currency: price_range.minimum_price.final_price.currency,
    value: price_range.minimum_price.final_price.value,
    items: [productToGtagItem(product)],
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  useEffect(() => globalThis.gtag?.('event', 'view_item', viewItem), [viewItem])

  return <Prev {...props} />
}

export const Plugin = GaViewItem
