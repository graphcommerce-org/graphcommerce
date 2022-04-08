import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  GUEST_WISHLIST_STORAGE_NAME,
  GetIsInWishlistsDocument,
} from '@graphcommerce/magento-wishlist'
import { iconHeart, DesktopHeaderBadge, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Fab, FabProps as FabPropsType, NoSsr, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React, { useEffect } from 'react'

type WishlistFabContentProps = {
  icon?: React.ReactNode
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
}

const name = 'WishlistFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function WishlistFabContent(props: WishlistFabContentProps) {
  const { icon, FabProps, sx } = props

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  let activeWishlist = false
  if (isLoggedIn) {
    const wishlistItemCount = GetCustomerWishlistData?.customer?.wishlists[0]?.items_count || 0
    activeWishlist = wishlistItemCount > 0
  }

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
        <DesktopHeaderBadge
          badgeContent={activeWishlist ? 1 : 0}
          color='primary'
          variant='dot'
          overlap='circular'
        >
          {icon ?? <IconSvg src={iconHeart} size='large' />}
        </DesktopHeaderBadge>
      </Fab>
    </PageLink>
  )
}

export function WishlistFab(props: WishlistFabContentProps) {
  return (
    <NoSsr fallback={<WishlistFabContent {...props} />}>
      <WishlistFabContent {...props} />
    </NoSsr>
  )
}
