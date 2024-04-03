import { nonNullable } from '@graphcommerce/next-ui'
import { event } from '../event'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { ViewCartFragment } from './ViewCartFragment.gql'

export const viewCart = <C extends ViewCartFragment>(cart: C | null | undefined) => {
  if (!cart) return

  event('view_cart', {
    cart_id: cart?.id,
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    items: cart?.items?.filter(nonNullable).map(cartItemToGoogleDatalayerItem),
  })
}
