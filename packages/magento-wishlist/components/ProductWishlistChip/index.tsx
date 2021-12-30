import { SvgImageSimple, iconHeart } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import {CustomerDocument, CustomerTokenDocument, useFormIsEmailAvailable} from "@graphcommerce/magento-customer";
import { AddProductToWishlistDocument, RemoveProductFromWishlistDocument } from "@graphcommerce/magento-wishlist"

export type ProductWishlistChipProps = {
  sku: string
} & ChipProps

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
  { name: 'ProductListReviews' },
)

export default function ProductWishlistChip(props: ProductWishlistChipProps) {
  const { sku, ...chipProps } = props
  const classes = useStyles()

  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    let wishlist = getWishlistStorage()
    if (wishlist.includes(sku)) {
      setInWishlist(true)
    }
  })

  /**
   * @todo this cant be good for performance, refetching data for each component
   */
  const customerToken = useQuery(CustomerTokenDocument)
  const customerQuery = useQuery(CustomerDocument, {
    ssr: false,
    skip: typeof customerToken.data === 'undefined',
  })

  const { email } = customerQuery.data?.customer ?? {}
  const { mode } = useFormIsEmailAvailable({ email })

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()

    let wishlist = getWishlistStorage()

    // Add or remove wishlist icon depending on current wishlist state
    if (wishlist.includes(sku)) {
      if (mode === 'signedin') {
        // Persist to db storage when user session is available
        let wishlistItemsInSession = customerQuery.data?.customer?.wishlists[0]?.items_v2?.items || []
        let item = wishlistItemsInSession.find(element => element?.product?.sku == sku)

        if (item?.id) {
          removeWishlistItem({variables: {wishlistItemId: item.id}})
        }
      }

      wishlist = wishlist.filter(itemSku => itemSku !== sku )
      setInWishlist(false)
    }
    else {
      if (mode === 'signedin') {
        // Persist to db storage when user session is available
        addWishlistItem({variables: {sku: sku}})
      }

      wishlist.push(sku)
      setInWishlist(true)
    }

    localStorage.wishlist = JSON.stringify(wishlist)
  }

  const getWishlistStorage = () => {
    return localStorage?.wishlist ? JSON.parse(localStorage?.wishlist) : []
  }

  const chip = (
    <Chip
      variant='outlined'
      key={sku}
      onClick={handleClick}
      icon={<SvgImageSimple src={iconHeart} size='small' className={inWishlist ? classes.iconHeartActive : classes.iconHeart} />}
      color='default'
      size='small'
      {...chipProps}
    />
  )

  return chip
}
