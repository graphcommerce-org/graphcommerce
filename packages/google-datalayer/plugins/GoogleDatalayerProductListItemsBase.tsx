import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { ItemList } from '../components/AnalyticsItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'

export function GoogleDatalayerProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <ItemList {...rest}>
      <Prev {...rest} />
    </ItemList>
  )
}

export const Plugin = GoogleDatalayerProductListItemsBase
