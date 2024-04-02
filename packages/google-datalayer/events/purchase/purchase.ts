import { PaymentMethodContextFragment } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethodContext.gql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { event } from '../../lib/event'

export const purchase = <C extends PaymentMethodContextFragment>(
  orderNumber: string,
  cart: C | null | undefined,
) =>
  event('purchase', {
    cart_id: cart?.id,
    transaction_id: orderNumber,
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    payment_type: cart?.selected_payment_method?.code,
    tax: cart?.prices?.applied_taxes?.reduce((sum, tax) => sum + (tax?.amount?.value ?? 0), 0),
    items: filterNonNullableKeys(cart?.items).map((item) => ({
      item_id: item?.product.sku,
      item_name: item?.product.name,
      currency: item?.prices?.price.currency,
      quantity: item?.quantity,
      price: (item.prices?.price.value ?? 1) / item.quantity,
      discount: item.prices.discounts?.reduce(
        (sum, discount) => sum + (discount?.amount?.value ?? 0 / item.quantity),
        0,
      ),
    })),
  })
