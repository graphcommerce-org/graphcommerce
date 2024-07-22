import { cartItemToDatalayerItem } from '../cartItemToDatalayerItem/cartItemToDatalayerItem'
import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { CartItem_RemoveFromCartFragment } from './CartItem_RemoveFromCart.gql'

export const cartItemToRemoveFromCart = <C extends CartItem_RemoveFromCartFragment>(
  cartItem: C,
) => {
  const items = [cartItemToDatalayerItem(cartItem)]
  return {
    ...datalayerItemsToCurrencyValue(items),
    items,
  }
}
