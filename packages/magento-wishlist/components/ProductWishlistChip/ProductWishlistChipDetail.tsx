import React from 'react'
import { ProductWishlistIconButton, ProductWishlistChipProps } from './ProductWishlistIconButton'

/**
 * @deprecated use ProductWishlistIconButton with an sx prop.
 */
export const ProductWishlistChipDetail = React.memo<ProductWishlistChipProps>((props) => {
  return <ProductWishlistIconButton sx={{ boxShadow: 6 }} {...props} />
})
