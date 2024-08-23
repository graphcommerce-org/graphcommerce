import type { ProductPageMetaProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { useSendEvent } from '../api/sendEvent'
import { productToViewItem } from '../mapping/productToViewItem/productToViewItem'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'component',
}

/** When a product detail page is viewed, send a Google Analytics event */
export function ProductPageMeta(props: PluginProps<ProductPageMetaProps>) {
  const { Prev, product } = props

  const sendEvent = useSendEvent()
  const viewItem = useMemoObject(productToViewItem(product))
  useEffect(() => sendEvent('view_item', viewItem), [sendEvent, viewItem])

  return <Prev {...props} />
}
