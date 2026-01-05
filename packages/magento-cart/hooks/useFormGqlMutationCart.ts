import type { TypedDocumentNode, useMutation } from '@graphcommerce/graphql'
import { CombinedGraphQLErrors, useApolloClient } from '@graphcommerce/graphql'
import type {
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@graphcommerce/react-hook-form'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import { GraphQLError, Kind } from 'graphql'
import { useCartIdContext } from '../components/CartIdContext'
import { isProtectedCartOperation } from '../link/isProtectedCartOperation'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { useCartIdCreate } from './useCartIdCreate'
import { useCartShouldLoginToContinue } from './useCartPermissions'

export function useFormGqlMutationCart<
  Q extends Record<string, unknown>,
  V extends { cartId: string; [index: string]: unknown },
>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> & { submitWhileLocked?: boolean } = {},
  operationOptions?: useMutation.Options<NoInfer<Q>, NoInfer<V>>,
): UseFormGqlMutationReturn<Q, V> {
  const cartIdCreate = useCartIdCreate()
  const cartIdFromContext = useCartIdContext()
  const client = useApolloClient()
  const shouldLoginToContinue = useCartShouldLoginToContinue()

  let shouldBlockOperation = false
  document.definitions.forEach((defenition) => {
    if (defenition.kind === Kind.OPERATION_DEFINITION) {
      shouldBlockOperation = !isProtectedCartOperation(defenition.name?.value ?? '')
    }
  })

  const result = useFormGqlMutation<Q, V>(
    document,
    {
      ...options,
      onBeforeSubmit: async (incoming) => {
        const variables = options.onBeforeSubmit ? await options.onBeforeSubmit(incoming) : incoming
        if (variables === false) return false
        if (shouldLoginToContinue && shouldBlockOperation) return false

        const res = client.cache.readQuery({ query: CurrentCartIdDocument })
        const cartId = cartIdFromContext ?? incoming.cartId ?? (await cartIdCreate())

        if (
          cartId === res?.currentCartId?.id &&
          res?.currentCartId?.locked &&
          !options.submitWhileLocked
        ) {
          throw Error(
            'Could not submit form, cart is locked. This is a bug. You may never submit a form while the cart is locked.',
          )
        }

        return { ...variables, cartId }
      },
    },
    { errorPolicy: 'all', ...operationOptions },
  )

  if (shouldLoginToContinue && result.formState.isSubmitted && shouldBlockOperation) {
    return {
      ...result,
      error: new CombinedGraphQLErrors({
        errors: [
          new GraphQLError(t`You must be logged in to modify your cart.`, {
            extensions: { category: 'graphql-authorization' },
          }),
        ],
      }),
    }
  }

  return result
}
