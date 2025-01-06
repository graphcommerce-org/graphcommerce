import React from 'react'
import type { ProductWishlistChipProps } from './ProductWishlistIconButton'
import { ProductWishlistIconButton } from './ProductWishlistIconButton'

/** @deprecated Use ProductWishlistIconButton with an sx prop. */
export const ProductWishlistChipDetail = React.memo<ProductWishlistChipProps>((props) => (
  <ProductWishlistIconButton sx={{ boxShadow: 6 }} {...props} />
))
