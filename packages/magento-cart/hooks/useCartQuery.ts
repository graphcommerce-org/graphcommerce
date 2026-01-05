import type {
  OperationVariables,
  TypedDocumentNode,
  WatchQueryFetchPolicy,
} from '@graphcommerce/graphql'
import { CombinedGraphQLErrors, useQuery } from '@graphcommerce/graphql'
import type { useQuery as useQueryType } from '@apollo/client/react'
import { t } from '@lingui/core/macro'
import { GraphQLError } from 'graphql'
import { useRouter } from 'next/router'
import { useCartShouldLoginToContinue } from './useCartPermissions'
import { useCurrentCartId } from './useCurrentCartId'

type CartQueryOptions<Q, V extends OperationVariables> = Omit<
  useQueryType.Options<Q, V>,
  'variables'
> & {
  variables?: Omit<V, 'cartId'>
}

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
export function useCartQuery<
  Q,
  V extends OperationVariables & { cartId: string; [index: string]: unknown },
>(document: TypedDocumentNode<Q, V>, options?: CartQueryOptions<Q, V>) {
  const router = useRouter()
  const { currentCartId, locked } = useCurrentCartId()

  const urlCartId = router.query.cart_id
  const usingUrl = typeof urlCartId === 'string'
  const cartId = usingUrl ? urlCartId : currentCartId
  const shouldLoginToContinue = useCartShouldLoginToContinue()

  let fetchPolicy: WatchQueryFetchPolicy | undefined = options?.fetchPolicy
  let returnPartialData: boolean | undefined = options?.returnPartialData

  if (usingUrl || locked) fetchPolicy = 'cache-only'
  if (usingUrl && typeof returnPartialData === 'undefined') returnPartialData = true

  const variables = { cartId, ...options?.variables } as V

  const query = useQuery(document, {
    ...options,
    fetchPolicy,
    returnPartialData,
    variables,
    skip: options?.skip || !cartId || shouldLoginToContinue,
  })

  if (shouldLoginToContinue && !options?.skip) {
    return {
      ...query,
      error: new CombinedGraphQLErrors({
        errors: [
          new GraphQLError(t`You must be logged in to view your cart.`, {
            extensions: { category: 'graphql-authorization' },
          }),
        ],
      }),
    }
  }

  return query
}
