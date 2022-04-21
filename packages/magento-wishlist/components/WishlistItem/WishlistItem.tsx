/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  GetIsInWishlistsDocument,
  RemoveProductFromWishlistDocument,
} from '@graphcommerce/magento-wishlist'
import { responsiveVal, extendableComponent, iconEllypsis, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Badge, Box, Link, SxProps, Theme, Typography } from '@mui/material'

import { useState, PropsWithChildren } from 'react'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'

const rowImageSize = responsiveVal(70, 125)

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = PropsWithChildren<WishlistItemProductFragment> & {
  sx?: SxProps<Theme>
} & OptionalProductWishlistParent

export function WishlistItem(props: WishlistItemProps) {
  const { sku, name, price_range, children } = props

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
