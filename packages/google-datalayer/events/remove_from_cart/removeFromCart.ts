import { nonNullable } from '@graphcommerce/next-ui'
import { event } from '../event'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { RemoveFromCartFragment } from './RemoveFromCartFragment.gql'

export const removeFromCart = <C extends RemoveFromCartFragment>(cart: C | null | undefined) =>
  event('remove_from_cart', {
    cart_id: cart?.id,
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    items: cart?.items?.filter(nonNullable)?.map(cartItemToGoogleDatalayerItem),
  })
