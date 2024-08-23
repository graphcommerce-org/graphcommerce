import { ProductListItemProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useViewItemList } from '../components/DatalayerViewItemList'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'component',
}

export function ProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, onClick, ...rest } = props
  const selectItem = useViewItemList()

  return (
    <Prev
      {...rest}
      onClick={useEventCallback<NonNullable<typeof onClick>>((e, item) => {
        if (item.sku) selectItem(item.sku)
        return onClick?.(e, item)
      })}
    />
  )
}
