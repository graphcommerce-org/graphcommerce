import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { DatalayerViewItemList } from '../components/DatalayerViewItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'

export function GoogleDatalayerProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <DatalayerViewItemList {...rest}>
      <Prev {...rest} />
    </DatalayerViewItemList>
  )
}

export const Plugin = GoogleDatalayerProductListItemsBase
