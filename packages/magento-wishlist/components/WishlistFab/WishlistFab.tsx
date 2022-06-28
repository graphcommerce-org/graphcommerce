import {
  useCustomerQuery,
  useCustomerSession,
  useGuestQuery,
} from '@graphcommerce/magento-customer'
import { iconHeart, DesktopHeaderBadge, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Fab, FabProps as FabPropsType, NoSsr, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { useWishlistEnabled } from '../../hooks'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'

type WishlistFabContentProps = {
  icon?: React.ReactNode
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
  activeWishlist: boolean
}

const name = 'WishlistFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

const hideForGuest = process.env.NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST === '1'

function WishlistFabContent(props: WishlistFabContentProps) {
  const { icon, FabProps, sx, activeWishlist } = props

  const wishlistIcon = icon ?? <IconSvg src={iconHeart} size='large' />

  return (
    <PageLink href='/wishlist' passHref>
      <Fab
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
            <DesktopHeaderBadge color='primary' variant='dot' overlap='circular'>
              {wishlistIcon}
            </DesktopHeaderBadge>
          ) : (
            wishlistIcon
          )}
        </NoSsr>
      </Fab>
    </PageLink>
  )
}

export type WishlistFabProps = Omit<WishlistFabContentProps, 'activeWishlist'>

export function WishlistFab(props: WishlistFabProps) {
  const isWishlistEnabled = useWishlistEnabled()

  const { loggedIn } = useCustomerSession()

  const { data: GetCustomerWishlistData } = useCustomerQuery(GetIsInWishlistsDocument)
  const { data: guestWishlistData } = useGuestQuery(GuestWishlistDocument)

  let activeWishlist = false
  if (loggedIn) {
    const wishlistItemCount = GetCustomerWishlistData?.customer?.wishlists[0]?.items_count || 0
    activeWishlist = wishlistItemCount > 0
  } else {
    const wishlist = guestWishlistData?.guestWishlist?.items || []
    activeWishlist = wishlist.length > 0
  }

  if (!isWishlistEnabled) return null

  if (hideForGuest) {
    return (
      <NoSsr fallback={null}>
        <WishlistFabContent {...props} activeWishlist={activeWishlist} />
      </NoSsr>
    )
  }

  return (
    <NoSsr fallback={<WishlistFabContent {...props} activeWishlist={false} />}>
      <WishlistFabContent {...props} activeWishlist={activeWishlist} />
    </NoSsr>
  )
}
