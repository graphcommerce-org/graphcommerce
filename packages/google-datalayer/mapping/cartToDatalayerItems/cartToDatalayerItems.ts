import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToDatalayerItem } from '../cartItemToDatalayerItem/cartItemToDatalayerItem'
import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { Cart_DatalayerItemsFragment } from './Cart_DatalayerItems.gql'

export function cartToDatalayerItems<C extends Cart_DatalayerItemsFragment>(cart: C) {
  const items = cart.items?.filter(nonNullable).map(cartItemToDatalayerItem)
  if (!items) return {}
  return { ...datalayerItemsToCurrencyValue(items), items }
}
