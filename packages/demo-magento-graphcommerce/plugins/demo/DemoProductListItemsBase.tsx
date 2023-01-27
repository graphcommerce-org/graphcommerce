import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Theme } from '@mui/material'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

export const sxLargeItem = (theme: Theme) => ({
  [theme.breakpoints.up('xl')]: {
    ':not(.ContainerWithHeader-root &)': {
      '& > :nth-of-type(7n + 3)': {
        gridColumn: 'span 2',
        gridRow: 'span 2',
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: '100%',
        gridTemplateRows: '1fr auto',
        '& > div:first-of-type': {
          position: 'relative',
          height: '100%',
        },
      },
    },
  },
})

function DemoProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, sx = [], ...rest } = props
  return <Prev {...rest} sx={[sxLargeItem, ...(Array.isArray(sx) ? sx : [sx])]} />
}
export const Plugin = DemoProductListItemsBase
