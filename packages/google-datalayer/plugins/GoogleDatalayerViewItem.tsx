import type { ProductPageMeta } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import React, { useEffect } from 'react'
import { productToGoogleDatalayerItem } from '../events/productToGoogleDatalayerItem'
import { event } from '../events/event'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GoogleDatalayerViewItem(props: PluginProps<React.ComponentProps<typeof ProductPageMeta>>) {
  const { Prev, product } = props
  const { price_range } = product

  const viewItem = useMemoObject({
    currency: price_range.minimum_price.final_price.currency,
    value: price_range.minimum_price.final_price.value,
    items: [productToGoogleDatalayerItem(product)],
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  useEffect(() => {
    event('view_item', viewItem)
  }, [viewItem])

  return <Prev {...props} />
}

export const Plugin = GoogleDatalayerViewItem
