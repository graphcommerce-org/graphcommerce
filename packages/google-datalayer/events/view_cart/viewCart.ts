import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { event } from '../event'
import { ViewCartFragment } from './ViewCartFragment.gql'

export const viewCart = <C extends ViewCartFragment>(cart: C | null | undefined) => {
  if (!cart) return

  const items = cart?.items?.filter(nonNullable).map(cartItemToGoogleDatalayerItem)

  event('view_cart', {
    currency: cart?.prices?.subtotal_including_tax?.currency,
    value: cart?.prices?.subtotal_including_tax?.value,
    items,
  })
}
