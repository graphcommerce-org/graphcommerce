import type { ApolloLink } from '@graphcommerce/graphql'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { t } from '@lingui/core/macro'
import type { PaymentMethodPlaceOrderNoopMutation } from './PaymentMethodPlaceOrderNoop.gql'

type PlaceOrderResult = ApolloLink.Result<PaymentMethodPlaceOrderNoopMutation>

export type PlacedOrder = {
  order_number: string
}

export type AssertedOrderPlaced = PlaceOrderResult & {
  data: {
    placeOrder: { order: PlacedOrder }
  }
}

export function throwGenericPlaceOrderError(): never {
  throw new CombinedGraphQLErrors({
    errors: [
      {
        message: t`An error occurred while processing your payment. Please contact the store owner`,
      },
    ],
  })
}

/** Assert that the order was place successfully. */
export function assertOrderPlaced(result: PlaceOrderResult): asserts result is AssertedOrderPlaced {
  // Check for GraphQL errors in the result
  if (result.errors && result.errors.length > 0) {
    throw new CombinedGraphQLErrors(result)
  }

  // Check for place order specific errors
  const placeOrderData = result.data?.placeOrder as
    | { errors?: { message: string }[] | null; order?: { order_number?: string } | null }
    | null
    | undefined

  if (placeOrderData?.errors && placeOrderData.errors.length > 0) {
    throw new CombinedGraphQLErrors({
      errors: placeOrderData.errors.filter((e) => e !== null),
    })
  }

  const orderNumber = placeOrderData?.order?.order_number
  if (!orderNumber) {
    console.info('Error while placing order', result)
    throwGenericPlaceOrderError()
  }
}
