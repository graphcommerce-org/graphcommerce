import { GoogleDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'

export function datalayerItemsToCurrencyValue(items: GoogleDatalayerItem[]) {
  return {
    currency: items[0].currency,
    value: items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0),
  }
}
