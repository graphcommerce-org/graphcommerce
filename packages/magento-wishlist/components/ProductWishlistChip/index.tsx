import { SvgImageSimple, iconHeart } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

export type ProductWishlistChipProps = {
  active?: boolean,
  sku?: string
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
  const { active = false, sku, ...chipProps } = props
  const classes = useStyles()

  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    let wishlist = getWishlistStorage()
    if (wishlist.includes(sku)) {
      setInWishlist(true)
    }
  })

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let wishlist = getWishlistStorage()

    if (wishlist.includes(sku)) {
      wishlist = wishlist.filter(itemSku => itemSku !== sku )
      setInWishlist(false)
    }
    else {
      wishlist.push(sku)
      setInWishlist(true)
    }

    localStorage.wishlist = JSON.stringify(wishlist)
    e.preventDefault()
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
