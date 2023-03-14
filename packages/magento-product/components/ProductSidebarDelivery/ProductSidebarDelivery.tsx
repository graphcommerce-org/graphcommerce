import { breakpointVal, iconOrderBefore, IconSvg } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { darken, lighten } from '@mui/material/styles'
import { UseAddProductsToCartActionFragment } from '../AddProductsToCart/UseAddProductsToCartAction.gql'

type ProductSidebarDeliveryProps = {
  product?: UseAddProductsToCartActionFragment
}

export function ProductSidebarDelivery(props: ProductSidebarDeliveryProps) {
  const { product } = props
  const { stock_status, only_x_left_in_stock } = product ?? {}

  let title = 'Order before 22:00'
  let subtitle = 'Next day delivery - Shipping free'

  if (stock_status === 'OUT_OF_STOCK') {
    title = 'Out of stock'
    subtitle = 'We are sorry, this product is currently out of stock.'
  } else if (stock_status === 'IN_STOCK' && only_x_left_in_stock) {
    title = 'Only a few left'
    subtitle = `Only ${only_x_left_in_stock} left in stock.`
  }
  if (only_x_left_in_stock === 1) {
    subtitle = 'Only 1 left in stock.'
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        alignItems: 'center',
        gridTemplate: `
          "image title"
          ".     subtitle"
        `,
        gridTemplateColumns: `min-content auto`,
        columnGap: theme.spacings.xxs,
        background:
          theme.palette.mode === 'light'
            ? darken(theme.palette.background.default, 0.01)
            : lighten(theme.palette.background.default, 0.2),
        padding: theme.spacings.xxs,
        ...breakpointVal(
          'borderRadius',
          theme.shape.borderRadius * 3,
          theme.shape.borderRadius * 4,
          theme.breakpoints.values,
        ),
      })}
    >
      <IconSvg src={iconOrderBefore} size='small' sx={{ gridArea: 'image' }} />
      <Box sx={{ typography: 'body2', gridArea: 'title', fontWeight: 600 }}>{title}</Box>
      <Box sx={{ typography: 'body2', gridArea: 'subtitle', color: 'text.primary' }}>
        {subtitle}
      </Box>
    </Box>
  )
}
