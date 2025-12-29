import type { TypedDocumentNode } from '@apollo/client'
import type { useLazyQuery } from '@apollo/client/react'
import { useLazyQuery as useLazyQueryHook } from '@apollo/client/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { UseFormGraphQlOptions } from './useFormGql'
import { useFormGql } from './useFormGql'
import { type UseFormGqlMutationReturn } from './useFormGqlMutation'

export type UseFormGqlQueryReturn<
  Q extends Record<string, unknown>,
  V extends FieldValues,
> = UseFormGqlMutationReturn<Q, V>

export function useFormGqlQuery<Q extends Record<string, unknown>, V extends FieldValues>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: useLazyQuery.Options<Q, V>,
): UseFormGqlQueryReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useLazyQueryHook(document, { ...operationOptions })
  const operation = useFormGql({ document, form, tuple, operationOptions, ...options })
  return { ...form, ...operation }
}
