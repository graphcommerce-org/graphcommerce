import {
  DesktopHeaderBadge,
  extendableComponent,
  iconShoppingBag,
  IconSvg,
  sxx,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Fab } from '@mui/material'
import type { CartFabContentProps } from './CartFab'

export type CartFabStaticProps = Omit<CartFabContentProps, 'disableScrollEffects'>

const { classes } = extendableComponent('CartFab', ['root', 'cart', 'shadow'] as const)

export function CartFabStatic(props: CartFabStaticProps) {
  const { total_quantity, icon, sx = [], BadgeProps, ...fabProps } = props

  const cartIcon = icon ?? <IconSvg src={iconShoppingBag} size='large' />

  return (
    <Fab
      href='/cart'
      className={classes.cart}
      aria-label={t`Cart`}
      color='inherit'
      size='responsive'
      sx={sxx(
        (theme) => ({
          [theme.breakpoints.down('md')]: {
            backgroundColor: theme.vars.palette.background.paper,
          },
        }),
        sx,
      )}
      {...fabProps}
    >
      <DesktopHeaderBadge
        color='primary'
        variant='dot'
        overlap='circular'
        badgeContent={total_quantity}
        {...BadgeProps}
      >
        {cartIcon}
      </DesktopHeaderBadge>
    </Fab>
  )
}
