import type { TypedDocumentNode } from '@apollo/client'
import type { useMutation } from '@apollo/client/react'
import { useMutation as useMutationHook } from '@apollo/client/react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { UseFormGqlMethods, UseFormGraphQlOptions } from './useFormGql'
import { useFormGql, UseFormGqlSymbol } from './useFormGql'

export type UseFormGqlMutationReturn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Q extends Record<string, any> = Record<string, any>,
  V extends FieldValues = FieldValues,
> = Omit<UseFormReturn<V>, 'handleSubmit'> & UseFormGqlMethods<Q, V>

export function isFormGqlOperation<
  V extends FieldValues,
  Q extends Record<string, unknown> = Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
>(form: any): form is UseFormGqlMutationReturn<Q, V> {
  return (form as UseFormGqlMutationReturn<Q, V>)[UseFormGqlSymbol] === true
}

export function assertFormGqlOperation<
  V extends FieldValues,
  Q extends Record<string, unknown> = Record<string, unknown>,
>(form: UseFormReturn<V>): asserts form is UseFormGqlMutationReturn<Q, V> {
  if (!isFormGqlOperation(form))
    throw Error("form must be one of 'useFromGqlMutation' or 'useFormGqlQuery'")
}

/** Bindings between react-hook-form's useForm and Apollo Client's useMutation hook. */
export function useFormGqlMutation<Q extends Record<string, unknown>, V extends FieldValues>(
  document: TypedDocumentNode<Q, V>,
  options: NoInfer<UseFormGraphQlOptions<Q, V>> = {},
  operationOptions?: useMutation.Options<NoInfer<Q>, NoInfer<V>>,
): UseFormGqlMutationReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useMutationHook<Q, V>(document, operationOptions as useMutation.Options<Q, V>)
  const operation = useFormGql({ document, form, tuple, operationOptions, ...options })
  // operation.handleSubmit overrides form.handleSubmit
  return { ...form, ...operation } as unknown as UseFormGqlMutationReturn<Q, V>
}
