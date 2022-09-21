import { ProductWishlistChipBase, ProductWishlistChipProps } from './ProductWishlistChipBase'

export function ProductWishlistChipDetailConfigurable(props: ProductWishlistChipProps) {
  return <ProductWishlistChipBase sx={(theme) => ({ boxShadow: theme.shadows[6] })} {...props} />
}
