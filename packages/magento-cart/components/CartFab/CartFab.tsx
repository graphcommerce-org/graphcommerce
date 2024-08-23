import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import {
  extendableComponent,
  iconShoppingBag,
  DesktopHeaderBadge,
  IconSvg,
  useScrollY,
  useFabSize,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Fab, FabProps, styled, Box, SxProps, Theme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React, { CSSProperties } from 'react'
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

  const scrollY = useScrollY()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])
  const backgroundOpacity = useTransform(scrollY, [0, 10], [0, 1])

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
      <MotionFab
        href='/cart'
        className={classes.cart}
        aria-label={i18n._(/* i18n */ 'Cart')}
        color='inherit'
        size='responsive'
        style={
          // Motion types don't understand css vars are valid keys. Force type as CSSProperties to make ts shut up
          { '--background-opacity': backgroundOpacity } as CSSProperties
        }
        sx={(theme) => ({
          backgroundColor: `rgb(${theme.vars.palette.background.paperChannel} / var(--background-opacity, 0)) !important`,
          [theme.breakpoints.down('md')]: {
            backgroundColor: `${theme.vars.palette.background.paper} !important`,
          },
        })}
        {...fabProps}
      >
        <DesktopHeaderBadge
          color='primary'
          variant='dot'
          overlap='circular'
          badgeContent={total_quantity}
        >
          {cartIcon}
        </DesktopHeaderBadge>
      </MotionFab>

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

export function CartFab(props: CartFabProps) {
  const cartQuery = useCartQuery(CartFabDocument)

  return (
    <WaitForQueries waitFor={cartQuery} fallback={<CartFabContent {...props} total_quantity={0} />}>
      <CartFabContent total_quantity={cartQuery.data?.cart?.total_quantity ?? 0} {...props} />
    </WaitForQueries>
  )
}
