import {
  extendableComponent,
  iconShoppingBag,
  DesktopHeaderBadge,
  IconSvg,
  useScrollY,
  useFabSize,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { alpha, Fab, FabProps, NoSsr, styled, useTheme, Box, SxProps, Theme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { CartFabDocument } from './CartFab.gql'
import { CartTotalQuantityFragment } from './CartTotalQuantity.gql'

export type CartFabProps = {
  icon?: React.ReactNode
  sx?: SxProps<Theme>
} & Pick<FabProps, 'color' | 'size' | 'variant'>

type CartFabContentProps = CartFabProps & CartTotalQuantityFragment

const MotionDiv = styled(m.div)({})

const MotionFab = m(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.forwardRef<any, Omit<FabProps, 'style' | 'onDrag'>>((props, ref) => (
    <Fab {...props} ref={ref} />
  )),
)

const { classes } = extendableComponent('CartFab', ['root', 'cart', 'shadow'] as const)

function CartFabContent(props: CartFabContentProps) {
  const { total_quantity, icon, sx = [], ...fabProps } = props

  const theme2 = useTheme()
  const scrollY = useScrollY()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])

  const paper0 = alpha(theme2.palette.background.paper, 0)
  const paper1 = alpha(theme2.palette.background.paper, 1)
  const backgroundColor = useTransform(scrollY, [0, 10], [paper0, paper1])

  const cartIcon = icon ?? <IconSvg src={iconShoppingBag} size='large' />
  const fabIconSize = useFabSize('responsive')

  return (
    <Box
      className={classes.root}
      sx={[
        { position: 'relative', width: fabIconSize, height: fabIconSize },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <PageLink href='/cart' passHref>
        <MotionFab
          className={classes.cart}
          aria-label={i18n._(/* i18n */ 'Cart')}
          color='inherit'
          size='responsive'
          style={{ backgroundColor }}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              backgroundColor: `${theme.palette.background.paper} !important`,
            },
          })}
          {...fabProps}
        >
          {total_quantity > 0 ? (
            <DesktopHeaderBadge color='primary' variant='dot' overlap='circular'>
              {cartIcon}
            </DesktopHeaderBadge>
          ) : (
            cartIcon
          )}
        </MotionFab>
      </PageLink>
      <MotionDiv
        className={classes.shadow}
        sx={(theme) => ({
          pointerEvents: 'none',
          borderRadius: '99em',
          position: 'absolute',
          height: '100%',
          width: '100%',
          boxShadow: 6,
          top: 0,
          [theme.breakpoints.down('md')]: {
            opacity: '1 !important',
          },
        })}
        style={{ opacity }}
      />
    </Box>
  )
}

/**
 * We give CartFab a bit of special handling. We don't want to make requests for this component
 * whilly nilly. We've imposed some limitations:
 *
 * We use useCartQuery that means that this will only execute when there is a cartId.
 *
 * We use fetchPolicy 'cache-only' so that when the cart comes into existence it will not
 * immediately start fetching. Why? There is a time between creating a cart and adding the first
 * product to the cart. This would mean that it would immediately start executing this query.
 */
export function CartFab(props: CartFabProps) {
  const { data, loading, called } = useCartQuery(CartFabDocument, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'cache-first',
  })
  const qty = data?.cart?.total_quantity ?? 0

  if (loading || !called) {
    return <CartFabContent {...props} total_quantity={0} />
  }

  return <CartFabContent total_quantity={qty} {...props} />
}
