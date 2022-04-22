import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { iconHeart, DesktopHeaderBadge, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Fab, FabProps as FabPropsType, NoSsr, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React, { useEffect } from 'react'
import { useWishlistEnabled } from '../../hooks'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'

type WishlistFabContentProps = {
  icon?: React.ReactNode
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
}

const name = 'WishlistFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

const hideForGuest = process.env.NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST === '1'

function WishlistFabContent(props: WishlistFabContentProps) {
  const { icon, FabProps, sx } = props

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  const { data: guestWishlistData, loading: loadingGuestWishlistData } = useQuery(
    GuestWishlistDocument,
    {
      ssr: false,
      skip: isLoggedIn === true,
    },
  )

  let activeWishlist = false
  if (isLoggedIn) {
    const wishlistItemCount = GetCustomerWishlistData?.customer?.wishlists[0]?.items_count || 0
    activeWishlist = wishlistItemCount > 0
  } else {
    const wishlist = guestWishlistData?.guestWishlist?.items || []
    activeWishlist = wishlist.length > 0
  }

  const wishlistIcon = icon ?? <IconSvg src={iconHeart} size='large' />

  return (
    <PageLink href='/wishlist' passHref>
      <Fab
        color='inherit'
        data-test-id='wishlist-fab'
        aria-label={t`Wishlist`}
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
    </PageLink>
  )
}

export function WishlistFab(props: WishlistFabContentProps) {
  const isWishlistEnabled = useWishlistEnabled()

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  return (
    <>
      {isWishlistEnabled && (!hideForGuest || isLoggedIn) && (
        <NoSsr>
          <WishlistFabContent {...props} />
        </NoSsr>
      )}
    </>
  )
}
