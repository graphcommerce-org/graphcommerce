import { ProductListItemProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useViewItemList } from '../components/DatalayerViewItemList'

export const component = 'ProductListItem'
export const exported = '@graphcommerce/magento-product'

function GoogleDatalayerProductListItem(props: PluginProps<ProductListItemProps>) {
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

export const Plugin = GoogleDatalayerProductListItem
