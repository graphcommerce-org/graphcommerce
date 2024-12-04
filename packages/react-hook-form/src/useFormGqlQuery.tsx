import type { LazyQueryHookOptions, TypedDocumentNode } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { UseFormGraphQlOptions } from './useFormGql'
import { useFormGql } from './useFormGql'
import type { UseFormGqlMutationReturn } from './useFormGqlMutation'
import { useFormMuiRegister } from './useFormMuiRegister'

export type UseFormGqlQueryReturn<
  Q extends Record<string, unknown>,
  V extends FieldValues,
> = UseFormGqlMutationReturn<Q, V>

export function useFormGqlQuery<Q extends Record<string, unknown>, V extends FieldValues>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: LazyQueryHookOptions<Q, V>,
): UseFormGqlQueryReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useLazyQuery(document, operationOptions)
  const operation = useFormGql({ document, form, tuple, operationOptions, ...options })
  const muiRegister = useFormMuiRegister(form)

  return { ...form, ...operation, valid: {}, muiRegister }
}
