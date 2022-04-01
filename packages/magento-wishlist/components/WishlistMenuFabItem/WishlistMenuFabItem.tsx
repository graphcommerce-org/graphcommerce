import { MenuFabSecondaryItem, iconHeart, IconSvg } from '@graphcommerce/next-ui'
import { Badge, NoSsr, SxProps, Theme } from '@mui/material'
import React from 'react'

type WishlistMenuFabItemProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
}

function WishlistMenuFabItemContent(props: WishlistMenuFabItemProps) {
  const { icon, children, sx = [] } = props

  return (
    <MenuFabSecondaryItem
      sx={sx}
      icon={
        <Badge
          badgeContent={true ? 1 : 0}
          color={true ? 'primary' : 'error'}
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

export function WishlistMenuFabItem(props: WishlistMenuFabItemProps) {
  return (
    <NoSsr fallback={<WishlistMenuFabItemContent {...props} />}>
      <WishlistMenuFabItemContent {...props} />
    </NoSsr>
  )
}
