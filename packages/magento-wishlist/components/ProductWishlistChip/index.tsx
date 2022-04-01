import { IconSvg, iconHeart, extendableComponent } from '@graphcommerce/next-ui'
import { SxProps, Theme, IconButton, IconButtonProps } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  AddProductToWishlistDocument,
  RemoveProductFromWishlistDocument,
} from '@graphcommerce/magento-wishlist'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  GUEST_WISHLIST_STORAGE_NAME,
  GetIsInWishlistsDocument,
} from '@graphcommerce/magento-wishlist'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'
import { t } from '@lingui/macro'

type ProductWishlistSettings = {
  hideForGuest?: true | false
}

export type ProductWishlistChipProps = ProductWishlistChipFragment &
  IconButtonProps &
  ProductWishlistSettings & { sx?: SxProps<Theme> }

const name = 'ProductWishlistChip' as const
const parts = ['root', 'iconHeart', 'iconHeartActive', 'wishlistButton'] as const
const { classes } = extendableComponent(name, parts)

export default function ProductWishlistChip(props: ProductWishlistChipProps) {
  const { hideForGuest, sku, sx = [] } = props

  const [inWishlist, setInWishlist] = useState(false)
  const [displayWishlist, setDisplayWishlist] = useState(true)

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const heart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.iconHeart}
      sx={(theme) => ({ stroke: '#AC2E2E' })}
    />
  )

  const activeHeart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.iconHeartActive}
      sx={{ stroke: '#AC2E2E', fill: '#AC2E2E' }}
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
      let wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')
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
        let wishlistItemsInSession =
          GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

        let item = wishlistItemsInSession.find((element) => element?.product?.sku == sku)

        if (item?.id) {
          removeWishlistItem({ variables: { wishlistItemId: item.id } }).then(() => {
            setInWishlist(false)
          })
        }
      } else if (sku) {
        addWishlistItem({ variables: { input: { sku: sku, quantity: 1 } } }).then(() => {
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
    <>
      <IconButton
        key={sku}
        onClick={handleClick}
        size='small'
        className={classes.wishlistButton}
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
        title={inWishlist ? t`Remove from wishlist` : t`Add to wishlist`}
        aria-label={inWishlist ? t`Remove from wishlist` : t`Add to wishlist`}
      >
        {inWishlist ? activeHeart : heart}
      </IconButton>
    </>
  )

  return !hideForGuest || isLoggedIn ? button : null
}
