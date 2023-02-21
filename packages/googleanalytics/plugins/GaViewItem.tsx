import { ProductPageMetaFragment } from '@graphcommerce/magento-product/components/ProductPageMeta/ProductPageMeta.gql'
import { PluginProps } from '@graphcommerce/next-config'
import { useEffect } from 'react'
import { gtagViewItem } from '../events/gtagViewItem/gtagViewItem'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GaViewItem(props: PluginProps<ProductPageMetaFragment>) {
  const { Prev, url_key, ...rest } = props

  useEffect(() => gtagViewItem(rest), [rest])

  return <Prev {...props} />
}

export const Plugin = GaViewItem
