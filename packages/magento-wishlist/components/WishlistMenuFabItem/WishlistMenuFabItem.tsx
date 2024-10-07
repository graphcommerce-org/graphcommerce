import { MenuFabSecondaryItem, iconHeart, IconSvg } from '@graphcommerce/next-ui'
import { Badge, NoSsr, SxProps, Theme } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import { useWishlistEnabled, useWishlistItems } from '../../hooks'

type WishlistMenuFabItemContentProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
  activeWishlist: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

function WishlistMenuFabItemContent(props: WishlistMenuFabItemContentProps) {
  const { icon, onClick, children, sx = [], activeWishlist } = props

  return (
    <MenuFabSecondaryItem
      onClick={onClick}
      sx={sx}
      icon={
        <Badge
          badgeContent={activeWishlist ? 1 : 0}
          color='primary'
          variant='dot'
          overlap='circular'
        >
          {icon ?? <IconSvg src={iconHeart} size='medium' />}
        </Badge>
      }
      href='/wishlist'
    >
      {children}
    </MenuFabSecondaryItem>
  )
}

export type WishlistMenuFabItemProps = Omit<WishlistMenuFabItemContentProps, 'activeWishlist'>

export function WishlistMenuFabItem(props: WishlistMenuFabItemProps) {
  const wishlist = useWishlistItems()

  if (!wishlist.enabled) return null

  const activeWishlist = wishlist.items.length > 0

  return (
    <NoSsr fallback={<WishlistMenuFabItemContent {...props} activeWishlist={false} />}>
      <WishlistMenuFabItemContent {...props} activeWishlist={activeWishlist} />
    </NoSsr>
  )
}
