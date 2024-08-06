import {
  GoogleDatalayerItem,
  productToDatalayerItem,
} from '../productToDatalayerItem/productToDatalayerItem'
import { CartItem_DatalayerItemFragment } from './CartItem_DatalayerItem.gql'

export function cartItemToDatalayerItem<P extends CartItem_DatalayerItemFragment>(
  item: P,
  index: number,
): GoogleDatalayerItem {
  const discount = item.prices?.total_item_discount?.value
    ? item.prices.total_item_discount.value / item.quantity
    : 0

  const price = (item?.prices?.price_including_tax?.value ?? 0) - discount

  return {
    ...productToDatalayerItem(item.product, index),
    currency: item.prices?.price.currency as string,
    discount,
    price,
    quantity: item.quantity,
    item_variant:
      item.__typename === 'ConfigurableCartItem'
        ? (item.configured_variant.sku ?? undefined)
        : undefined,
  }
}
