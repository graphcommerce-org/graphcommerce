import { GtagAddPaymentInfoFragment } from './GtagAddPaymentInfo.gql'

export function gtagAddPaymentInfo<C extends GtagAddPaymentInfoFragment>(cart?: C | null) {
  globalThis.gtag?.('event', 'add_payment_info', {
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code),
    payment_type: cart?.selected_payment_method?.code,
    items: cart?.items?.map((item) => ({
      item_id: item?.product.sku,
      item_name: item?.product.name,
      currency: item?.prices?.price.currency,
      discount: item?.prices?.discounts?.reduce(
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        (sum, discount) => sum + (discount?.amount?.value ?? 0),
        0,
      ),
      price: item?.prices?.price.value,
      quantity: item?.quantity,
    })),
  })
}
