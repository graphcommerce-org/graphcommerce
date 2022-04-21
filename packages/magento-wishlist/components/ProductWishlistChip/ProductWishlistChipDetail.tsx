import { ProductWishlistChipBase, ProductWishlistChipProps } from '@graphcommerce/magento-wishlist'

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
