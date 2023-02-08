import type { ProductListItemProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Typography } from '@mui/material'

export const component = 'ProductListItem'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function DemoProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, ...rest } = props
  return (
    <Prev
      {...rest}
      subTitle={
        <Typography component='span' variant='caption'>
          BY GC
        </Typography>
      }
    />
  )
}
export const Plugin = DemoProductListItem
