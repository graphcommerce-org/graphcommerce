import { cartItemToDatalayerItem } from '../cartItemToDatalayerItem/cartItemToDatalayerItem'
import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import type { CartItem_RemoveFromCartFragment } from './CartItem_RemoveFromCart.gql'

export const cartItemToRemoveFromCart = <C extends CartItem_RemoveFromCartFragment>(
  cartItem: C,
) => {
  const items = [cartItemToDatalayerItem(cartItem, 0)]
  return { ...datalayerItemsToCurrencyValue(items), items }
}
