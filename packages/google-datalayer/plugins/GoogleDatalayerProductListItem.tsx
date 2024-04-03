import { ProductListItem } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { ComponentProps, useContext } from 'react'
import { AnalyticsItemListContext } from '../components/AnalyticsItemList'

export const component = 'ProductListItem'
export const exported = '@graphcommerce/magento-product'

function GoogleDatalayerProductListItem(
  props: PluginProps<ComponentProps<typeof ProductListItem>>,
) {
  const { Prev, onClick, ...rest } = props
  const context = useContext(AnalyticsItemListContext)

  return (
    <Prev
      {...rest}
      onClick={useEventCallback<NonNullable<typeof onClick>>((e, item) => {
        if (item.sku) context?.selectItem(item.sku)
        return onClick?.(e, item)
      })}
    />
  )
}

export const Plugin = GoogleDatalayerProductListItem
