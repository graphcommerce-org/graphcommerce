import { useWishlistItems } from '@graphcommerce/magento-wishlist'
import { AnimatedRow, RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { AnimatePresence } from 'framer-motion'
import { WishlistItemsFragment } from './WishlistItems.gql'

export type WishlistItemRenderer = TypeRenderer<
  NonNullable<
    NonNullable<NonNullable<NonNullable<WishlistItemsFragment['items_v2']>['items']>[0]>['product']
  >
>

export type WishlistProps = { renderer: WishlistItemRenderer }

export function WishlistItems(props: WishlistProps) {
  const { renderer } = props
  const wishlistItemsData = useWishlistItems()

  /** Structure between guest and customer wishlist differs */
  return (
    <AnimatePresence initial={false}>
      {wishlistItemsData.items?.map((item) => {
        if (!item?.uid && !item?.id) return null

        const productData = item?.product ? item?.product : item
        return (
          <AnimatedRow key={item.id || item.uid}>
            <RenderType renderer={renderer} wishlistItemId={item.id || null} {...productData} />
          </AnimatedRow>
        )
      })}
    </AnimatePresence>
  )
}
