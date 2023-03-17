import { GtagViewCartFragment } from './GtagViewCart.gql'

export function gtagViewCart<C extends GtagViewCartFragment>(cart?: C | null) {
  if (!cart) return

  globalThis.gtag?.('event', 'view_cart', {
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    items: cart?.items?.map((item) => ({
      item_id: item?.product.sku,
      item_name: item?.product.name,
      currency: item?.prices?.price.currency,
      discount: item?.prices?.discounts?.reduce(
        (sum, discount) => sum + (discount?.amount?.value ?? 0),
        0,
      ),
      item_variant: item?.__typename === 'ConfigurableCartItem' ? item.configured_variant.sku : '',
      price: item?.prices?.price.value,
      quantity: item?.quantity,
    })),
  })
}
