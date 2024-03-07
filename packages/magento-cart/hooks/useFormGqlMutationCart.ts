import { MutationHookOptions, TypedDocumentNode, useApolloClient } from '@graphcommerce/graphql'
import {
  useFormGqlMutation,
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@graphcommerce/react-hook-form'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { useCartIdCreate } from './useCartIdCreate'

export function useFormGqlMutationCart<
  Q extends Record<string, unknown>,
  V extends { cartId: string; [index: string]: unknown },
>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const cartId = useCartIdCreate()
  const client = useApolloClient()

  const result = useFormGqlMutation<Q, V>(
    document,
    {
      ...options,
      onBeforeSubmit: async (variables) => {
        const vars = { ...variables, cartId: await cartId() }

        const res = client.cache.readQuery({ query: CurrentCartIdDocument })
        if (res?.currentCartId?.locked) return false
        return options.onBeforeSubmit ? options.onBeforeSubmit(vars) : vars
      },
    },
    { errorPolicy: 'all', ...operationOptions },
  )

  return result
}
