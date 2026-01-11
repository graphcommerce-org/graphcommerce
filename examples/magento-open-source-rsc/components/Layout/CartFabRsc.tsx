'use client'

import {
  DesktopHeaderBadge,
  extendableComponent,
  iconShoppingBag,
  IconSvg,
  sxx,
  useFabSize,
  useScrollY,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import type { BadgeProps, FabProps, SxProps, Theme } from '@mui/material'
import { Box, Fab, styled, useTheme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import { useParams } from 'next/navigation'
import React from 'react'

export type CartFabRscProps = {
  icon?: React.ReactNode
  sx?: SxProps<Theme>
  BadgeProps?: BadgeProps
  /** Total quantity - can be passed from server or client state */
  totalQuantity?: number
} & Pick<FabProps, 'color' | 'size' | 'variant'>

const MotionDiv = styled(m.div)({})

const MotionFab = m.create(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.forwardRef<any, Omit<FabProps, 'style' | 'onDrag'>>((props, ref) => (
    <Fab {...props} ref={ref} />
  )),
)

const { classes } = extendableComponent('CartFab', ['root', 'cart', 'shadow'] as const)

/**
 * App Router compatible CartFab component. Similar to the original CartFab but doesn't use
 * useRouter from next/router. For full cart functionality, the cart state should be managed via a
 * client context or RSC data fetching.
 */
export function CartFabRsc(props: CartFabRscProps) {
  const { totalQuantity = 0, icon, sx = [], BadgeProps, ...fabProps } = props

  const params = useParams<{ store: string }>()
  const store = params.store

  const theme2 = useTheme()
  const scrollY = useScrollY()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])

  const paper0 = theme2.alpha(theme2.palette.background.paper, 0)
  const paper1 = theme2.alpha(theme2.palette.background.paper, 1)
  const backgroundColor = useTransform(scrollY, [0, 10], [paper0, paper1])

  const cartIcon = icon ?? <IconSvg src={iconShoppingBag} size='large' />
  const fabIconSize = useFabSize('responsive')

  return (
    <Box
      className={classes.root}
      sx={sxx({ position: 'relative', width: fabIconSize, height: fabIconSize }, sx)}
    >
      <MotionFab
        href={`/${store}/cart`}
        className={classes.cart}
        aria-label={t`Cart`}
        color='inherit'
        size='responsive'
        style={{ backgroundColor }}
        sx={(theme) => ({
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
          badgeContent={totalQuantity}
          {...BadgeProps}
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
