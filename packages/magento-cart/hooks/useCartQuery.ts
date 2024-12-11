import type { QueryHookOptions, TypedDocumentNode } from '@graphcommerce/graphql'
import { ApolloError, useQuery } from '@graphcommerce/graphql'
import { GraphQLError } from 'graphql'
import { useRouter } from 'next/router'
import { useCartShouldLoginToContinue } from './useCartPermissions'
import { useCurrentCartId } from './useCurrentCartId'

/**
 * Requires the query to have a `$cartId: String!` argument. It will automatically inject the
 * currently active cart_id.
 *
 * Example:
 *
 * ```tsx
 * const { data } = useCartQuery(CartFabQueryDocument)
 * ```
 */
export function useCartQuery<Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, Omit<V, 'cartId'>> & {
    /**
     * @deprecated Not used anymore, when the cart_id is in the URL, it will always be used.
     */
    allowUrl?: boolean
  } = {},
) {
  const { allowUrl, ...queryOptions } = options

  const router = useRouter()
  const { currentCartId, locked } = useCurrentCartId()

  const urlCartId = router.query.cart_id
  const usingUrl = typeof urlCartId === 'string'
  const cartId = usingUrl ? urlCartId : currentCartId
  const shouldLoginToContinue = useCartShouldLoginToContinue()

  if (usingUrl || locked) queryOptions.fetchPolicy = 'cache-only'

  if (usingUrl && typeof queryOptions.returnPartialData === 'undefined')
    queryOptions.returnPartialData = true

  queryOptions.variables = { cartId, ...options?.variables } as V

  const query = useQuery(document, {
    ...(queryOptions as QueryHookOptions<Q, V>),
    skip: queryOptions.skip || !cartId || shouldLoginToContinue,
  })

  if (shouldLoginToContinue && !queryOptions?.skip) {
    return {
      ...query,
      error: new ApolloError({
        graphQLErrors: [
          new GraphQLError('Action can not be performed by the current user', {
            extensions: { category: 'graphql-authorization' },
          }),
        ],
      }),
    }
  }

  return query
}
