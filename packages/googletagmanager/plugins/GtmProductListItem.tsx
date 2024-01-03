import { ProductListItemProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'

export const component = 'ProductListItem'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleTagmanagerId'

function GaProductListItemsBase(props: PluginProps<ProductListItemProps>) {
  const { Prev, onClick, ...rest } = props
  const handle = useGoogleAnalyticsListItemHandler(rest)

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

export const Plugin = GaProductListItemsBase
