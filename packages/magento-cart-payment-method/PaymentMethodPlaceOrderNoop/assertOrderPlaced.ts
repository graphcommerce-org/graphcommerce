import type { FetchResult } from '@graphcommerce/graphql'
import { ApolloError } from '@graphcommerce/graphql'
import { t } from '@lingui/macro'
import type { PaymentMethodPlaceOrderNoopMutation } from './PaymentMethodPlaceOrderNoop.gql'

export type PlacedOrder<T extends FetchResult<PaymentMethodPlaceOrderNoopMutation>> = NonNullable<
  NonNullable<NonNullable<T['data']>['placeOrder']>['order']
>

export type AssertedOrderPlaced<T extends FetchResult<PaymentMethodPlaceOrderNoopMutation>> = T & {
  data: {
    placeOrder: { order: PlacedOrder<T> }
  }
}

export function throwGenericPlaceOrderError() {
  throw new ApolloError({
    graphQLErrors: [
      {
        message: t`An error occurred while processing your payment. Please contact the store owner`,
      },
    ],
  })
}

/** Assert that the order was place successfully. */
export function assertOrderPlaced<T extends FetchResult<PaymentMethodPlaceOrderNoopMutation>>(
  result: T,
): asserts result is AssertedOrderPlaced<T> {
  if (result.errors && result.errors.length > 0) {
    const graphQLErrors = result.errors.filter((e) => e !== null)
    throw new ApolloError({ graphQLErrors })
  }

  if (result.data?.placeOrder?.errors && result.data.placeOrder.errors.length > 0) {
    const graphQLErrors = result.data.placeOrder.errors.filter((e) => e !== null)
    throw new ApolloError({ graphQLErrors })
  }

  if (!result.data?.placeOrder?.order?.order_number) {
    console.info('Error while placing order', result)
    throwGenericPlaceOrderError()
  }
}
