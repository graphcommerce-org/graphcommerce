import { ProductListItemReal } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useListItemHandler } from '../components/AnalyticsItemList'
import { ComponentProps } from 'react'

export const component = 'ProductListItemReal'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'analytics'

function ProductListItemsBase(props: PluginProps<ComponentProps<typeof ProductListItemReal>>) {
  const { Prev, onClick, ...rest } = props
  const { sku, price_range, name } = rest
  const handle = useListItemHandler({ sku, price_range, name })

  return (
    <Prev
      {...rest}
      onClick={useEventCallback((e, item) => {
        handle()
        onClick?.(e, item)
      })}
    />
  )
}

export const Plugin = ProductListItemsBase
