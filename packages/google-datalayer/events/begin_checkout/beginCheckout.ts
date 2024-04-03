import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { event } from '../event'
import { BeginCheckoutFragment } from './BeginCheckoutFragment.gql'

export const beginCheckout = <C extends BeginCheckoutFragment>(cart?: C | null) => {
  event('begin_checkout', {
    currency: cart?.prices?.subtotal_including_tax?.currency,
    value: cart?.prices?.subtotal_including_tax?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    items: cart?.items?.filter(nonNullable).map((i) => cartItemToGoogleDatalayerItem(i)),
  })
}
