import { SvgImageSimple, iconHeart } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  AddProductToWishlistDocument,
  RemoveProductFromWishlistDocument,
} from '@graphcommerce/magento-wishlist'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { GetIsInWishlistsDocument } from '@graphcommerce/magento-wishlist'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'

export type ProductWishlistChipProps = ProductWishlistChipFragment & ChipProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    iconHeart: {
      stroke: '#AC2E2E',
      fill: '#FFF',
    },
    iconHeartActive: {
      stroke: '#AC2E2E',
      fill: '#AC2E2E',
    },
  }),
  { name: 'ProductWishlistChip' },
)

export default function ProductWishlistChip(props: ProductWishlistChipProps) {
  const { sku, ...chipProps } = props
  const classes = useStyles()
  const [inWishlist, setInWishlist] = useState(false)

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid
  const GUEST_WISHLIST = 'guest-wishlist'

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  // Mark as active when product is available in either customer or guest wishlist
  useEffect(() => {
    if (isLoggedIn && !loading && !inWishlist) {
      const inWishlistTest =
        GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
          (item) => item?.product?.sku,
        ) || []
      if (inWishlistTest.includes(sku)) {
        setInWishlist(true)
      }
    } else if (!isLoggedIn && !inWishlist) {
      let wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST) || '[]')
      if (wishlist.includes(sku)) {
        setInWishlist(true)
      }
    }
  })

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
      let wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST) || '[]')

      if (inWishlist) {
        wishlist = wishlist.filter((itemSku) => itemSku !== sku)
        localStorage.setItem(GUEST_WISHLIST, JSON.stringify(wishlist))
        setInWishlist(false)
      } else {
        wishlist.push(sku)
        localStorage.setItem(GUEST_WISHLIST, JSON.stringify(wishlist))
        setInWishlist(true)
      }
    }
  }

  const chip = (
    <Chip
      variant='outlined'
      key={sku}
      onClick={handleClick}
      icon={
        <SvgImageSimple
          src={iconHeart}
          size='small'
          className={inWishlist ? classes.iconHeartActive : classes.iconHeart}
        />
      }
      color='default'
      size='small'
      {...chipProps}
    />
  )

  return chip
}
