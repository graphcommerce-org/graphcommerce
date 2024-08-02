import type { ViewItem } from '../../api/sendEvent'
import { datalayerItemsToCurrencyValue } from '../datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import { productToDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'
import { Product_ViewItemFragment } from './Product_ViewItem.gql'

export function productToViewItem<C extends Product_ViewItemFragment>(product: C): ViewItem {
  const items = [productToDatalayerItem(product)]
  return {
    ...datalayerItemsToCurrencyValue(items),
    items,
  }
}
