import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToDatalayerItem } from '../cartItemToDatalayerItem/cartItemToDatalayerItem'
import type { DataLayerCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import type { GoogleDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'
import type { Cart_ViewCartFragment } from './Cart_ViewCart.gql'

export type ViewCart = DataLayerCurrencyValue & { items: GoogleDatalayerItem[] }

export function cartToViewCart<C extends Cart_ViewCartFragment>(cart: C): ViewCart {
  const items = cart?.items?.filter(nonNullable).map(cartItemToDatalayerItem) ?? []
  return { ...datalayerItemsToCurrencyValue(items), items }
}
