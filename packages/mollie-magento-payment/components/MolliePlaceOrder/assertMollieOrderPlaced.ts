import { type FetchResult } from '@graphcommerce/graphql'
import type { AssertedOrderPlaced, PlacedOrder } from '@graphcommerce/magento-cart-payment-method'
import {
  assertOrderPlaced,
  throwGenericPlaceOrderError,
} from '@graphcommerce/magento-cart-payment-method'
import type { MolliePlaceOrderMutation } from './MolliePlaceOrder.gql'

/** Assert that the order was place successfully. */
export function assertMollieOrderPlaced<T extends FetchResult<MolliePlaceOrderMutation>>(
  result: T,
): asserts result is AssertedOrderPlaced<T> & {
  data: {
    placeOrder: {
      order: PlacedOrder<T> & {
        mollie_redirect_url: NonNullable<PlacedOrder<T>['mollie_redirect_url']>
        mollie_payment_token: NonNullable<PlacedOrder<T>['mollie_payment_token']>
      }
    }
  }
} {
  assertOrderPlaced(result)

  const { mollie_redirect_url, mollie_payment_token } = result.data.placeOrder.order

  if (!mollie_redirect_url || !mollie_payment_token) {
    console.error(
      'Mollie: Order was placed, but no redirect url or payment token was returned, this is an issue on the Magento Mollie side.',
      result,
    )
    throwGenericPlaceOrderError()
  }
}
