import { CartItemToGoogleDatalayerItemFragment } from './CartItemToGoogleDatalayerItem.gql'
import { GoogleDatalayerItem, productToItem } from './productToItem'

export function cartItemToGoogleDatalayerItem<P extends CartItemToGoogleDatalayerItemFragment>(
  item: P,
): GoogleDatalayerItem {
  return {
    ...productToItem(item.product),
    currency: item?.prices?.price.currency as string,
    discount: item.prices?.discounts?.reduce(
      (sum, discount) => sum + (discount?.amount?.value ?? 0 / item.quantity),
      0,
    ),
    price: item?.prices?.price.value ?? undefined,
    quantity: item?.quantity,
    item_variant:
      item?.__typename === 'ConfigurableCartItem'
        ? item.configured_variant.sku ?? undefined
        : undefined,
  }
}
