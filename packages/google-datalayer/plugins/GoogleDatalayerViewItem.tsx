import type { ProductPageMeta } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import React, { useEffect } from 'react'
import { sendEvent } from '../api/sendEvent'
import { productToDatalayerItem } from '../mapping/productToDatalayerItem/productToDatalayerItem'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GoogleDatalayerViewItem(props: PluginProps<React.ComponentProps<typeof ProductPageMeta>>) {
  const { Prev, product } = props

  const viewItem = useMemoObject(productToDatalayerItem(product))
  useEffect(() => sendEvent('view_item', viewItem), [viewItem])

  return <Prev {...props} />
}

export const Plugin = GoogleDatalayerViewItem
