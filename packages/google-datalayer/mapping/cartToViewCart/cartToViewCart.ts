import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToDatalayerItem } from '../cartItemToDatalayerItem/cartItemToDatalayerItem'
import {
  DataLayerCurrencyValue,
  datalayerItemsToCurrencyValue,
} from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { GoogleDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'
import { Cart_ViewCartFragment } from './Cart_ViewCart.gql'

export type ViewCart = DataLayerCurrencyValue & { items: GoogleDatalayerItem[] }

export function cartToViewCart<C extends Cart_ViewCartFragment>(cart: C): ViewCart {
  const items = cart?.items?.filter(nonNullable).map(cartItemToDatalayerItem) ?? []
  return { ...datalayerItemsToCurrencyValue(items), items }
}
