import { useQuery, useMutation } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  AddProductToWishlistDocument,
  RemoveProductFromWishlistDocument,
  GUEST_WISHLIST_STORAGE_NAME,
  GetIsInWishlistsDocument,
} from '@graphcommerce/magento-wishlist'
import { IconSvg, iconHeart, extendableComponent } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { SxProps, Theme, IconButton, IconButtonProps } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'

type ProductWishlistSettings = {
  hideForGuest?: true | false
  variant?: 'default' | 'shadow'
}

export type ProductWishlistChipProps = ProductWishlistChipFragment &
  IconButtonProps &
  ProductWishlistSettings & { sx?: SxProps<Theme> }

const name = 'ProductWishlistChip' as const
const parts = ['root', 'iconHeart', 'iconHeartActive', 'wishlistButton'] as const
const { classes } = extendableComponent(name, parts)

export function ProductWishlistChip(props: ProductWishlistChipProps) {
  const { variant, hideForGuest, sku, sx = [] } = props

  const [inWishlist, setInWishlist] = useState(false)
  const [displayWishlist, setDisplayWishlist] = useState(true)

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const heart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.iconHeart}
      sx={(theme) => ({ color: theme.palette.primary.main })}
    />
  )

  const activeHeart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.iconHeartActive}
      sx={(theme) => ({ color: theme.palette.primary.main, fill: 'currentcolor' })}
    />
  )

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  useEffect(() => {
    // Do not display wishlist UI to guests when configured as customer only
    if (hideForGuest && !isLoggedIn) {
      setDisplayWishlist(false)
      return
    }

    // Mark as active when product is available in either customer or guest wishlist
    if (isLoggedIn && !loading && !inWishlist) {
      const inWishlistTest =
        GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
          (item) => item?.product?.sku,
        ) || []
      if (inWishlistTest.includes(sku)) {
        setInWishlist(true)
      }
    } else if (!isLoggedIn && !inWishlist) {
      const wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')
      if (wishlist.includes(sku)) {
        setInWishlist(true)
      }
    }
  })

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const handleClick = (e) => {
    e.preventDefault()

    if (isLoggedIn) {
      if (inWishlist) {
        const wishlistItemsInSession =
          GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

        const item = wishlistItemsInSession.find((element) => element?.product?.sku == sku)

        if (item?.id) {
          removeWishlistItem({ variables: { wishlistItemId: item.id } }).then(() => {
            setInWishlist(false)
          })
        }
      } else if (sku) {
        addWishlistItem({ variables: { input: { sku, quantity: 1 } } }).then(() => {
          setInWishlist(true)
        })
      }
    } else {
      let wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')

      if (inWishlist) {
        wishlist = wishlist.filter((itemSku) => itemSku !== sku)
        localStorage.setItem(GUEST_WISHLIST_STORAGE_NAME, JSON.stringify(wishlist))
        setInWishlist(false)
      } else {
        wishlist.push(sku)
        localStorage.setItem(GUEST_WISHLIST_STORAGE_NAME, JSON.stringify(wishlist))
        setInWishlist(true)
      }
    }
  }

  const button = (
    <IconButton
      key={sku}
      onClick={handleClick}
      size='small'
      className={classes.wishlistButton}
      sx={[
        (theme) => ({
          padding: theme.spacings.xxs,
          boxShadow: variant === 'shadow' ? theme.shadows[6] : 'none',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      title={inWishlist ? t`Remove from wishlist` : t`Add to wishlist`}
      aria-label={inWishlist ? t`Remove from wishlist` : t`Add to wishlist`}
    >
      {inWishlist ? activeHeart : heart}
    </IconButton>
  )

  return !hideForGuest || isLoggedIn ? button : null
}

ProductWishlistChip.defaultProps = {
  variant: 'default',
  hideForGuest: false,
}
