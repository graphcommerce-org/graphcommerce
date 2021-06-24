import { MutationHookOptions, TypedDocumentNode } from '@apollo/client'
import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import {
  useFormGqlMutation,
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@reachdigital/react-hook-form'
import { useCartIdCreate } from './useCartIdCreate'

export function useFormGqlMutationCart<Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const cartId = useCartIdCreate()

  const onBeforeSubmit = async (variables: V) => {
    const vars = { ...variables, cartId: await cartId() }
    return options.onBeforeSubmit ? options.onBeforeSubmit(vars) : vars
  }
  const result = useFormGqlMutation<Q, V>(
    document,
    { ...options, onBeforeSubmit },
    { errorPolicy: 'all', ...operationOptions },
  )

  return result
}
