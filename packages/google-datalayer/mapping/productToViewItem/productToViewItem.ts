import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { productToDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'
import { Product_ViewItemFragment } from './Product_ViewItem.gql'

export function productToViewItem<C extends Product_ViewItemFragment>(product: C) {
  const items = [productToDatalayerItem(product)]
  return {
    ...datalayerItemsToCurrencyValue(items),
    items,
  }
}
