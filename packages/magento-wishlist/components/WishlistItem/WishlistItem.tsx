/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { SxProps, Theme } from '@mui/material'

import { PropsWithChildren } from 'react'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = PropsWithChildren<WishlistItemProductFragment> & {
  sx?: SxProps<Theme>
} & OptionalProductWishlistParent

export function WishlistItem(props: WishlistItemProps) {
  const { sku, name, price_range } = props

  return (
    <WishlistItemBase {...props}>
      <ProductAddToCart
        variables={{ sku: sku ?? '', quantity: 1 }}
        name={name ?? ''}
        price={price_range.minimum_price.regular_price}
      />
    </WishlistItemBase>
  )
}
