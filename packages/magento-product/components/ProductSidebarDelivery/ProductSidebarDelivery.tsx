import { breakpointVal, iconOrderBefore, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box } from '@mui/material'
import type { UseAddProductsToCartActionFragment } from '../AddProductsToCart/UseAddProductsToCartAction.gql'

export type ProductSidebarDeliveryProps = {
  product?: UseAddProductsToCartActionFragment
}

export function ProductSidebarDelivery(props: ProductSidebarDeliveryProps) {
  const { product } = props
  const { stock_status, only_x_left_in_stock } = product ?? {}

  let title = <Trans>Order before 22:00</Trans>
  let subtitle = <Trans>Next day delivery - Shipping free</Trans>

  if (stock_status === 'OUT_OF_STOCK') {
    title = <Trans>Out of stock</Trans>
    subtitle = <Trans>We are sorry, this product is currently out of stock.</Trans>
  } else if (stock_status === 'IN_STOCK' && only_x_left_in_stock) {
    title = <Trans>Only a few left</Trans>
    subtitle = <Trans>Only {only_x_left_in_stock} left in stock.</Trans>
  }
  if (only_x_left_in_stock === 1) {
    subtitle = <Trans>Only 1 left in stock.</Trans>
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
        gridTemplateColumns: 'min-content auto',
        columnGap: theme.spacings.xxs,
        background: theme.lighten(theme.vars.palette.background.default, 0.2),
        padding: theme.spacings.xxs,
        ...breakpointVal(
          'borderRadius',
          theme.shape.borderRadius * 3,
          theme.shape.borderRadius * 4,
          theme.breakpoints.values,
        ),
        ...theme.applyStyles('light', {
          background: theme.darken(theme.vars.palette.background.default, 0.01),
        }),
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
