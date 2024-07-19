import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { DatalayerViewItemList } from '../components/DatalayerViewItemList'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'component',
}

export function ProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  return (
    <DatalayerViewItemList {...rest}>
      <Prev {...rest} />
    </DatalayerViewItemList>
  )
}
