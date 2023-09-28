import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { WishListItem, useWishlistItems } from '../../hooks'
import { WishlistItemsFragment } from './WishlistItems.gql'

// export type WishlistItemRenderer = TypeRenderer<
//   NonNullable<NonNullable<NonNullable<NonNullable<WishlistItemsFragment['items_v2']>['items']>[0]>>
// >

export type WishlistProps = { renderer: WishListItem[] }

export function WishlistItems(props: WishlistProps) {
  const { renderer } = props
  const wishlist = useWishlistItems()
  return (
    <>
      {wishlist.data?.map((item) => {
        if (!item?.id) return null
        const productData = item?.product
        const configurable_options =
          item.__typename === 'ConfigurableWishlistItem' && item.configurable_options

        return (
          <Box key={item?.id}>
            <RenderType
              renderer={renderer}
              wishlistItemId={item.id}
              {...productData}
              configurable_options={configurable_options}
            />
          </Box>
        )
      })}
    </>
  )
}
