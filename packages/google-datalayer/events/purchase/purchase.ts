import { PaymentMethodContextFragment } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethodContext.gql'
import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { event } from '../event'

export const purchase = <C extends PaymentMethodContextFragment>(
  orderNumber: string,
  cart: C | null | undefined,
) =>
  event('purchase', {
    transaction_id: orderNumber,
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    payment_type: cart?.selected_payment_method?.code,
    tax: cart?.prices?.applied_taxes?.reduce((sum, tax) => sum + (tax?.amount?.value ?? 0), 0),
    items: cart?.items?.filter(nonNullable).map(cartItemToGoogleDatalayerItem),

    // shipping: cart?.shipping_addresses[0]?.selected_shipping_method?.price_incl_tax.value,
    // shipping_carrier: cart?.shipping_addresses[0]?.selected_shipping_method?.carrier_code,
    // shipping_method: cart?.shipping_addresses[0]?.selected_shipping_method?.method_code,
  })
