import { fromPromise, globalApolloClient, Operation } from '@graphcommerce/graphql'
import { onError } from '@graphcommerce/graphql/apollo'
import { writeCartId } from '../hooks'
import { CreateEmptyCartDocument } from '../hooks/CreateEmptyCart.gql'
import { GraphQLError } from 'graphql'
import { ErrorCategory } from '@graphcommerce/magento-graphql'

type CartOperation = Operation & { variables: { cartId: string } }
function isCartOperation(operation: Operation): operation is CartOperation {
  return typeof operation.variables.cartId === 'string'
}

function errorIsIncluded(errorPath: readonly (string | number)[] | undefined, keys: string[]) {
  const error = errorPath?.join()
  return keys.some((value) => value === error)
}

export const cartErrorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!globalApolloClient.current) return undefined

  const client = globalApolloClient.current
  const { cache } = client

  if (!isCartOperation(operation) || !graphQLErrors) return undefined

  const isErrorCategory = (err: GraphQLError, category: ErrorCategory) =>
    err.extensions?.category === category

  const isAuthorizationError = (err: GraphQLError) =>
    isErrorCategory(err, 'graphql-authorization') &&
    errorIsIncluded(err.path, ['addProductsToCart'])

  const isNoSuchEntityError = (err: GraphQLError) =>
    isErrorCategory(err, 'graphql-no-such-entity') &&
    errorIsIncluded(err.path, [
      'cart',
      'addProductsToCart',
      /**
       * These mutations can also throw the graphql-no-such-entity exception, however, we're not
       * sure if it also throws for other types of entities.
       */
      // 'removeItemFromCart',
      // 'setBillingAddressOnCart',
      // 'setGuestEmailOnCart',
      // 'setPaymentMethodOnCart',
      // 'setShippingAddressesOnCart',
      // 'setShippingMethodsOnCart',
      // 'updateCartItems',
      // 'applyCouponToCart',
      // 'removeCouponFromCart'
    ])
  const cartErr = graphQLErrors.find((err) => isNoSuchEntityError(err) || isAuthorizationError(err))

  if (!cartErr) return undefined

  return fromPromise(client?.mutate({ mutation: CreateEmptyCartDocument }))
    .filter((value) => Boolean(value))
    .flatMap((cartData) => {
      const cartId = cartData.data?.createEmptyCart
      if (!cartId) return forward(operation)

      writeCartId(cache, cartId)
      operation.variables = { ...operation.variables, cartId }

      // retry the request, returning the new observable
      return forward(operation)
    })
})

export const createCartErrorLink = () => cartErrorLink
