import type { Operation } from '@graphcommerce/graphql'
import { globalApolloClient } from '@graphcommerce/graphql'
import { ApolloLink } from '@graphcommerce/graphql/apollo'
import { CustomerTokenDocument, getCustomerAccountCanSignIn } from '@graphcommerce/magento-customer'
import type { PushRouter } from '@graphcommerce/magento-customer/link/customerLink'
import { pushWithPromise } from '@graphcommerce/magento-customer/link/customerLink'
import type { ErrorCategory } from '@graphcommerce/magento-graphql'
import { permissions } from '@graphcommerce/next-config/config'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { ErrorLink } from '@apollo/client/link/error'
import { t } from '@lingui/core/macro'
import type { GraphQLFormattedError } from 'graphql'
import { GraphQLError } from 'graphql'
import { filter, from, of, switchMap } from 'rxjs'
import { writeCartId } from '../hooks'
import { CreateEmptyCartDocument } from '../hooks/CreateEmptyCart.gql'
import { getCartEnabledForUser } from '../utils'
import { isProtectedCartOperation } from './isProtectedCartOperation'

type CartOperation = Operation & { variables: { cartId: string } }
function isCartOperation(operation: Operation): operation is CartOperation {
  return typeof operation.variables.cartId === 'string'
}

function errorIsIncluded(errorPath: readonly (string | number)[] | undefined, keys: string[]) {
  const error = errorPath?.join()
  return keys.some((value) => value === error)
}

const cartErrorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!globalApolloClient.current) return undefined

  const client = globalApolloClient.current
  const { cache } = client

  // Check if this is a GraphQL error
  if (!CombinedGraphQLErrors.is(error)) return undefined

  if (!isCartOperation(operation)) return undefined

  const isErrorCategory = (err: GraphQLFormattedError, category: ErrorCategory) =>
    err.extensions?.category === category

  const isNoSuchEntityError = (err: GraphQLFormattedError) =>
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
  const cartErr = error.errors.find((err) => isNoSuchEntityError(err))

  if (!cartErr) return undefined

  if (globalThis.location?.search) {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('cart_id')) return forward(operation)
  }

  return from(client?.mutate({ mutation: CreateEmptyCartDocument })).pipe(
    filter((value) => Boolean(value)),
    switchMap((cartData) => {
      const cartId = cartData.data?.createEmptyCart
      if (!cartId) return forward(operation)

      writeCartId(cache, cartId)
      operation.variables = { ...operation.variables, cartId }

      // retry the request, returning the new observable
      return forward(operation)
    }),
  )
})

const cartPermissionLink = (router: PushRouter) =>
  new ApolloLink((operation, forward) => {
    const { locale } = router
    const { cache } = operation.client

    if (!isProtectedCartOperation(operation.operationName ?? '')) return forward(operation)

    const check = () => Boolean(cache?.readQuery({ query: CustomerTokenDocument }))
    if (getCartEnabledForUser(locale, check)) return forward(operation)

    if (!getCustomerAccountCanSignIn(locale))
      throw new Error(
        'Permission error: permissions.customerAccount is DISABLED, while permissions.cart is set to CUSTOMER_ONLY',
      )

    const oldHeaders = operation.getContext().headers
    const signInAgainPromise = pushWithPromise(router, '/account/signin')

    return from(signInAgainPromise).pipe(
      switchMap(() => {
        const tokenQuery = cache?.readQuery({ query: CustomerTokenDocument })

        if (tokenQuery?.customerToken?.valid) {
          // Customer is authenticated, retrying request.
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${tokenQuery?.customerToken?.token}`,
            },
          })
          return forward(operation)
        }

        return of({
          data: null,
          errors: [
            new GraphQLError(t`Please login to add products to your cart`, {
              extensions: { category: 'graphql-authorization' },
            }),
          ],
        })
      }),
    )
  })

export const cartLink = (router: PushRouter) => {
  const links: ApolloLink[] = [cartErrorLink]

  if (!(permissions?.cart === 'ENABLED')) {
    links.push(cartPermissionLink(router))
  }

  return ApolloLink.from(links)
}
