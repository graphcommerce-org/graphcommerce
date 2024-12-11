import type { ProductWishlistChipProps } from './ProductWishlistIconButton'
import { ProductWishlistIconButton } from './ProductWishlistIconButton'

/**
 * @deprecated
 */
export function ProductWishlistChipDetailConfigurable(props: ProductWishlistChipProps) {
  return <ProductWishlistIconButton sx={{ boxShadow: 6 }} {...props} />
}
