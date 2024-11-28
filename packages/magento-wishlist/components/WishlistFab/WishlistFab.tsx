import { iconHeart, DesktopHeaderBadge, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Fab, FabProps as FabPropsType, SxProps, Theme } from '@mui/material'
import React from 'react'
import { useWishlistEnabled, useWishlistItems } from '../../hooks'

type WishlistFabContentProps = {
  icon?: React.ReactNode
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
  activeWishlist: boolean
}

const name = 'WishlistFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function WishlistFabContent(props: WishlistFabContentProps) {
  const { icon, FabProps, sx, activeWishlist } = props

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
      {activeWishlist ? (
        <DesktopHeaderBadge color='primary' variant='dot' overlap='circular'>
          {wishlistIcon}
        </DesktopHeaderBadge>
      ) : (
        wishlistIcon
      )}
    </Fab>
  )
}

export type WishlistFabProps = Omit<WishlistFabContentProps, 'activeWishlist'>

export function WishlistFab(props: WishlistFabProps) {
  const enabled = useWishlistEnabled()
  const wishlist = useWishlistItems()

  if (!enabled) return null
  const activeWishlist = wishlist.items.length > 0 ?? false

  return <WishlistFabContent {...props} activeWishlist={activeWishlist} />
}
