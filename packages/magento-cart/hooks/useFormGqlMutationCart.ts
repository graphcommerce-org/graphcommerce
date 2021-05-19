import { MutationHookOptions, TypedDocumentNode } from '@apollo/client'
import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import {
  useFormGqlMutation,
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@reachdigital/react-hook-form'
import { useCartIdCreate } from './useCartIdCreate'
import { useClearCurrentCartId } from './useClearCurrentCartId'

export function useFormGqlMutationCart<Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const cartId = useCartIdCreate()
  const clear = useClearCurrentCartId()

  const onBeforeSubmit = async (variables: V) => ({ ...variables, cartId: await cartId() })
  const result = useFormGqlMutation<Q, V>(
    document,
    { ...options, onBeforeSubmit },
    operationOptions,
  )

  const [error, unauthorized] = graphqlErrorByCategory('graphql-authorization', result.error)
  if (unauthorized) clear()

  return { ...result, error }
}
