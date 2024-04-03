import { CartItemToGoogleDatalayerItemFragment } from './CartItemToGoogleDatalayerItem.gql'
import { GoogleDatalayerItem, productToGoogleDatalayerItem } from './productToGoogleDatalayerItem'

export function cartItemToGoogleDatalayerItem<P extends CartItemToGoogleDatalayerItemFragment>(
  item: P,
): GoogleDatalayerItem {
  return {
    ...productToGoogleDatalayerItem(item.product),
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
