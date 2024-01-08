import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { ItemList } from '../components/AnalyticsItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleTagmanagerId'

export function ProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <ItemList {...rest}>
      <Prev {...rest} />
    </ItemList>
  )
}

export const Plugin = ProductListItemsBase
