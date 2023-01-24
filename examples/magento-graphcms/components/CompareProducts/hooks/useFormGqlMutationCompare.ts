import {
  useFormGqlMutation,
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@graphcommerce/ecommerce-ui'
import { MutationHookOptions, TypedDocumentNode } from '@graphcommerce/graphql'
import { useCompareListIdCreate } from './useCompareListIdCreate'

export function useFormGqlMutationCompare<Q extends Record<string, any>, V extends { uid: string }>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const compareId = useCompareListIdCreate()

  const onBeforeSubmit = async (variables: V) => {
    const vars = { ...variables, uid: await compareId() }
    return options.onBeforeSubmit ? options.onBeforeSubmit(vars) : vars
  }
  const result = useFormGqlMutation<Q, V>(
    document,
    { ...options, onBeforeSubmit },
    { errorPolicy: 'all', ...operationOptions },
  )

  return result
}
