import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { GoogleTagManagerItemList } from '../components/GoogleAnalyticsItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleTagmanagerId'

export function GtmProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <GoogleTagManagerItemList {...rest}>
      <Prev {...rest} />
    </GoogleTagManagerItemList>
  )
}

export const Plugin = GtmProductListItemsBase
