import { useCustomerSession } from '@graphcommerce/magento-customer'
import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { ConfigurableOptions, useWishlistItems } from '../../hooks'
import { WishlistItemsFragment } from './WishlistItems.gql'

export type WishlistItemRenderer = TypeRenderer<
  NonNullable<
    NonNullable<NonNullable<NonNullable<WishlistItemsFragment['items_v2']>['items']>[0]>['product']
  > &
    ConfigurableOptions
>

export type WishlistProps = { renderer: WishlistItemRenderer }

export function WishlistItems(props: WishlistProps) {
  const { renderer } = props
  const wishlist = useWishlistItems()
  const { loggedIn } = useCustomerSession()

  return (
    <>
      {wishlist.data?.map((item, i) => {
        if (!item?.uid && !item?.id) return null
        const productData = item?.product
          ? { ...item?.product, configurable_options: item.configurable_options }
          : item

        return (
          <Box key={loggedIn ? item.id || item.uid : i}>
            <RenderType
              renderer={renderer}
              wishlistItemId={loggedIn ? item.id || null : i}
              {...productData}
            />
          </Box>
        )
      })}
    </>
  )
}
