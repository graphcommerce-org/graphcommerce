import { cartToDatalayerItems } from '../cartToDatalayerItems/cartToDatalayerItems'
import { Cart_ViewCartFragment } from './Cart_ViewCart.gql'

export function cartToViewCart<C extends Cart_ViewCartFragment>(cart: C) {
  return cartToDatalayerItems(cart)
}
