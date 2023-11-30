import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { CartItemsFragment } from '../../Api/CartItems.gql'

export type CartItemRenderer = TypeRenderer<NonNullable<NonNullable<CartItemsFragment['items']>[0]>>

export type CartProps = { renderer: CartItemRenderer } & CartItemsFragment

/**
 * @public
 * @deprecated Replace with CartItemsActionCards
 */
export function CartItems(props: CartProps) {
  const { renderer, items, id } = props

  return (
    <>
      {items?.map((item) => {
        if (!item?.uid || !id) return null
        return (
          <Box key={item.uid}>
            <RenderType renderer={renderer} {...item} />
          </Box>
        )
      })}
    </>
  )
}
