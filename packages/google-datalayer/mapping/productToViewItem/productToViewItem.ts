import type { DataLayerCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import type { GoogleDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'
import { productToDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'
import type { Product_ViewItemFragment } from './Product_ViewItem.gql'

export type ViewItem = { items: GoogleDatalayerItem[] } & DataLayerCurrencyValue

export function productToViewItem<C extends Product_ViewItemFragment>(product: C): ViewItem {
  const items = [productToDatalayerItem(product, 0)]
  return { ...datalayerItemsToCurrencyValue(items), items }
}
