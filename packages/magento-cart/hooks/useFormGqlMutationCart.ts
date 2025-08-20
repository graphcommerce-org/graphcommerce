import type { MutationHookOptions, TypedDocumentNode } from '@graphcommerce/graphql'
import { ApolloError, useApolloClient } from '@graphcommerce/graphql'
import type {
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@graphcommerce/react-hook-form'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { GraphQLError, Kind } from 'graphql'
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
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const cartId = useCartIdCreate()
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
        if (!options.submitWhileLocked && res?.currentCartId?.locked) {
          throw Error(
            'Could not submit form, cart is locked. This is a bug. You may never submit a form while the cart is locked.',
          )
        }

        return { ...variables, cartId: variables.cartId ?? (await cartId()) }
      },
    },
    { errorPolicy: 'all', ...operationOptions },
  )

  if (shouldLoginToContinue && result.formState.isSubmitted && shouldBlockOperation) {
    return {
      ...result,
      error: new ApolloError({
        graphQLErrors: [
          new GraphQLError('Action can not be performed by the current user', {
            extensions: { category: 'graphql-authorization' },
          }),
        ],
      }),
    }
  }

  return result
}
