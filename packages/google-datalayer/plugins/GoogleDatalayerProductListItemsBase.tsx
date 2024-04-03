import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { AnalyticsItemList } from '../components/AnalyticsItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'

export function GoogleDatalayerProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <AnalyticsItemList {...rest}>
      <Prev {...rest} />
    </AnalyticsItemList>
  )
}

export const Plugin = GoogleDatalayerProductListItemsBase
