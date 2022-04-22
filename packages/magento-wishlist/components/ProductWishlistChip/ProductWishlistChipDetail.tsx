import { ProductWishlistChipBase, ProductWishlistChipProps } from './ProductWishlistChipBase'

export function ProductWishlistChipDetail(props: ProductWishlistChipProps) {
  return (
    <ProductWishlistChipBase
      sx={(theme) => ({
        boxShadow: theme.shadows[6],
      })}
      {...props}
    />
  )
}
