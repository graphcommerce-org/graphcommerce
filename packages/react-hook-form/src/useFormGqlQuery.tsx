import { LazyQueryHookOptions, TypedDocumentNode, useLazyQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useFormGql, UseFormGraphQlOptions } from './useFormGql'
import { UseFormGqlMutationReturn } from './useFormGqlMutation'
import { useFormMuiRegister } from './useFormMuiRegister'
import { useFormValidFields } from './useFormValidFields'

export type UseFormGqlQueryReturn<Q, V> = UseFormGqlMutationReturn<Q, V>

export function useFormGqlQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: LazyQueryHookOptions<Q, V>,
): UseFormGqlQueryReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useLazyQuery(document, operationOptions)
  const operation = useFormGql({ document, form, tuple, ...options })
  const muiRegister = useFormMuiRegister(form)
  const valid = useFormValidFields(form, operation.required)

  return { ...form, ...operation, valid, muiRegister }
}
