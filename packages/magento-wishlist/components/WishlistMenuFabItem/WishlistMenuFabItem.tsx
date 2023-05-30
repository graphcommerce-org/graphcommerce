import {
  useCustomerQuery,
  useCustomerSession,
  useGuestQuery,
} from '@graphcommerce/magento-customer'
import { MenuFabSecondaryItem, iconHeart, IconSvg } from '@graphcommerce/next-ui'
import { Badge, NoSsr, SxProps, Theme } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import { useWishlistEnabled } from '../../hooks'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'

type WishlistMenuFabItemContentProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
  activeWishlist: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const hideForGuest = import.meta.graphCommerce.wishlistHideForGuests

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
  const isWishlistEnabled = useWishlistEnabled()
  const { loggedIn } = useCustomerSession()

  const { data: GetCustomerWishlistData } = useCustomerQuery(GetIsInWishlistsDocument)
  const { data: guestWishlistData } = useGuestQuery(GuestWishlistDocument)

  let activeWishlist: boolean
  if (loggedIn) {
    const wishlistItemCount = GetCustomerWishlistData?.customer?.wishlists[0]?.items_count ?? 0
    activeWishlist = wishlistItemCount > 0
  } else {
    const wishlist = guestWishlistData?.guestWishlist?.items ?? []
    activeWishlist = wishlist.length > 0
  }

  if (hideForGuest && !loggedIn) return null
  if (!isWishlistEnabled) return null
  return (
    <NoSsr fallback={<WishlistMenuFabItemContent {...props} activeWishlist={false} />}>
      <WishlistMenuFabItemContent {...props} activeWishlist={activeWishlist} />
    </NoSsr>
  )
}
