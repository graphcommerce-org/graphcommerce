import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType, nonNullable } from '@graphcommerce/next-ui'
import { useWishlistItems } from '../../hooks'
import { WishlistItemRenderer } from './WishlistItemRenderer'

export type WishlistProps = {
  renderers: WishlistItemRenderer
}

export function WishlistItems(props: WishlistProps) {
  const { renderers } = props
  const wishlist = useWishlistItems()
  return (
    <AddProductsToCartForm>
      {wishlist.data?.filter(nonNullable).map((item) => (
        <RenderType
          __typename={item.product?.__typename ?? 'SimpleProduct'}
          renderer={renderers}
          key={item.id}
          product={item.product}
        />
      ))}
    </AddProductsToCartForm>
  )
}
