import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { useWishlistItems } from '../../hooks'
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
    <>
      {wishlistItemsData.data?.map((item) => {
        if (!item?.uid && !item?.id) return null

        const productData = item?.product ? item?.product : item
        return (
          <Box key={item.id || item.uid}>
            <RenderType renderer={renderer} wishlistItemId={item.id || null} {...productData} />
          </Box>
        )
      })}
    </>
  )
}
