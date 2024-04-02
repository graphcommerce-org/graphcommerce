import { ProductListItemReal } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { ComponentProps } from 'react'
import { useListItemHandler } from '../components/AnalyticsItemList'

export const component = 'ProductListItemReal'
export const exported = '@graphcommerce/magento-product'

function GoogleDatalayerProductListItem(
  props: PluginProps<ComponentProps<typeof ProductListItemReal>>,
) {
  const { Prev, onClick, ...rest } = props
  const { sku, price_range, name } = rest
  const handle = useListItemHandler({ sku, price_range, name })

  return (
    <Prev
      {...rest}
      onClick={useEventCallback<NonNullable<typeof onClick>>((e, item) => {
        handle()
        return onClick?.(e, item)
      })}
    />
  )
}

export const Plugin = GoogleDatalayerProductListItem
