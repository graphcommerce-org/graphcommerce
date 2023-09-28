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
    <>
      {wishlist.data
        ?.filter(nonNullable)
        .map((item) => (
          <RenderType
            {...item}
            __typename={item.__typename || 'SimpleWishlistItem'}
            renderer={renderers}
            key={item.id}
          />
        ))}
    </>
  )
}
