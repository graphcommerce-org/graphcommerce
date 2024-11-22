import { DesktopHeaderBadge, IconSvg, extendableComponent, iconHeart } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import type { BadgeProps, FabProps as FabPropsType, SxProps, Theme } from '@mui/material'
import { Fab, NoSsr } from '@mui/material'
import React from 'react'
import { useWishlistEnabled, useWishlistItems } from '../../hooks'

type WishlistFabContentProps = {
  icon?: React.ReactNode
  FabProps?: Omit<FabPropsType, 'children'>
  BadgeProps?: BadgeProps
  sx?: SxProps<Theme>
  activeWishlist: boolean
}

const name = 'WishlistFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function WishlistFabContent(props: WishlistFabContentProps) {
  const { icon, FabProps, BadgeProps, sx, activeWishlist } = props

  const wishlistIcon = icon ?? <IconSvg src={iconHeart} size='large' />

  return (
    <Fab
      href='/wishlist'
      color='inherit'
      data-test-id='wishlist-fab'
      aria-label={i18n._(/* i18n */ 'Wishlist')}
      size='large'
      className={classes.root}
      {...FabProps}
      sx={sx}
    >
      <NoSsr fallback={wishlistIcon}>
        {activeWishlist ? (
          <DesktopHeaderBadge color='primary' variant='dot' overlap='circular' {...BadgeProps}>
            {wishlistIcon}
          </DesktopHeaderBadge>
        ) : (
          wishlistIcon
        )}
      </NoSsr>
    </Fab>
  )
}

export type WishlistFabProps = Omit<WishlistFabContentProps, 'activeWishlist'>

export function WishlistFab(props: WishlistFabProps) {
  const enabled = useWishlistEnabled()
  const wishlist = useWishlistItems()

  if (!enabled) return null
  const activeWishlist = wishlist.items.length > 0

  return (
    <NoSsr fallback={<WishlistFabContent {...props} activeWishlist={false} />}>
      <WishlistFabContent {...props} activeWishlist={activeWishlist} />
    </NoSsr>
  )
}
