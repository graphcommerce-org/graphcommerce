import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { event } from '../event'
import { AddPaymentInfoFragment } from './AddPaymentInfoFragment.gql'

export const addPaymentInfo = <C extends AddPaymentInfoFragment>(cart?: C | null) =>
  event('add_payment_info', {
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    payment_type: cart?.selected_payment_method?.code,
    items: cart?.items?.filter(nonNullable).map(cartItemToGoogleDatalayerItem),
  })
