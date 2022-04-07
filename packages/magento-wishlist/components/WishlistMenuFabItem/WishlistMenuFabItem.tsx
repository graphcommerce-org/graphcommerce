import { useQuery } from '@apollo/client'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  GUEST_WISHLIST_STORAGE_NAME,
  GetIsInWishlistsDocument,
} from '@graphcommerce/magento-wishlist'
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

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  let activeWishlist
  if (isLoggedIn) {
    const wishlistItemCount = GetCustomerWishlistData?.customer?.wishlists[0]?.items_count || 0
    activeWishlist = wishlistItemCount > 0
  } else {
    const wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')
    activeWishlist = wishlist.length > 0
  }

  return (
    <MenuFabSecondaryItem
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

export function WishlistMenuFabItem(props: WishlistMenuFabItemProps) {
  return (
    <NoSsr fallback={<WishlistMenuFabItemContent {...props} />}>
      <WishlistMenuFabItemContent {...props} />
    </NoSsr>
  )
}
