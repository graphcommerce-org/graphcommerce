import type { ApolloLink } from '@graphcommerce/graphql'
import {
  assertOrderPlaced,
  throwGenericPlaceOrderError,
} from '@graphcommerce/magento-cart-payment-method'
import type { MolliePlaceOrderMutation } from './MolliePlaceOrder.gql'

/** Assert that the order was place successfully. */
export function assertMollieOrderPlaced<T extends ApolloLink.Result<MolliePlaceOrderMutation>>(
  result: T,
): asserts result is T &
  ApolloLink.Result<MolliePlaceOrderMutation> & {
    data: {
      placeOrder: {
        order: {
          order_number: string
          mollie_redirect_url: string
          mollie_payment_token: string
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
