import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { MenuFabSecondaryItem, iconHeart, IconSvg } from '@graphcommerce/next-ui'
import { Badge, NoSsr, SxProps, Theme } from '@mui/material'
import React from 'react'
import { useWishlistEnabled } from '../../hooks'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'

type WishlistMenuFabItemProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const hideForGuest = process.env.NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST === '1'

function WishlistMenuFabItemContent(props: WishlistMenuFabItemProps) {
  const { icon, children, sx = [] } = props

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    ssr: false,
    skip: !isLoggedIn,
  })

  const { data: guestWishlistData, loading: loadingGuestWishlistData } = useQuery(
    GuestWishlistDocument,
    {
      ssr: false,
      skip: isLoggedIn === true,
    },
  )

  let activeWishlist
  if (isLoggedIn) {
    const wishlistItemCount = GetCustomerWishlistData?.customer?.wishlists[0]?.items_count || 0
    activeWishlist = wishlistItemCount > 0
  } else {
    const wishlist = guestWishlistData?.guestWishlist?.items || []
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
  const isWishlistEnabled = useWishlistEnabled()

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  return (
    <>
      {isWishlistEnabled && (!hideForGuest || isLoggedIn) && (
        <NoSsr fallback={<WishlistMenuFabItemContent {...props} />}>
          <WishlistMenuFabItemContent {...props} />
        </NoSsr>
      )}
    </>
  )
}
