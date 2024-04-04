import {
  GoogleDatalayerItem,
  productToDatalayerItem,
} from '../productToDatalayerItem/productToDatalayerItem'
import { CartItem_DatalayerItemFragment } from './CartItem_DatalayerItem.gql'

export function cartItemToDatalayerItem<P extends CartItem_DatalayerItemFragment>(
  item: P,
): GoogleDatalayerItem {
  return {
    ...productToDatalayerItem(item.product),
    currency: item?.prices?.price.currency as string,
    discount: item.prices?.total_item_discount?.value
      ? item.prices.total_item_discount.value / item.quantity
      : 0,
    price: item?.prices?.price_including_tax?.value ?? undefined,
    quantity: item?.quantity,
    item_variant:
      item?.__typename === 'ConfigurableCartItem'
        ? item.configured_variant.sku ?? undefined
        : undefined,
  }
}
