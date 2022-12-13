import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { GoogleAnalyticsItemList } from '../components/GoogleAnalyticsItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'

export function GaProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <GoogleAnalyticsItemList {...rest}>
      <Prev {...rest} />
    </GoogleAnalyticsItemList>
  )
}

export const Plugin = GaProductListItemsBase
