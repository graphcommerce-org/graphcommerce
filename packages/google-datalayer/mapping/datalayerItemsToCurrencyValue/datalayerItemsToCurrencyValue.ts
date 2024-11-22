import type { GoogleDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'

export type DataLayerCurrencyValue = {
  currency: string
  value: number
}

export function datalayerItemsToCurrencyValue(
  items: GoogleDatalayerItem[],
): DataLayerCurrencyValue {
  return {
    currency: items[0]?.currency ?? '',
    value: items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0),
  }
}
