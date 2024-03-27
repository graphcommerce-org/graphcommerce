import {
  MutationHookOptions,
  TypedDocumentNode,
  useApolloClient,
  useMutation,
} from '@apollo/client'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { useFormGql, UseFormGqlMethods, UseFormGraphQlOptions } from './useFormGql'
import { useFormMuiRegister, UseMuiFormRegister } from './useFormMuiRegister'
import { useFormValidFields, UseFormValidReturn } from './useFormValidFields'

export type UseFormGqlMutationReturn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Q extends Record<string, any> = Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends FieldValues = FieldValues,
> = UseFormGqlMethods<Q, V> &
  UseFormReturn<V> & {
    /**
     * @deprecated Please use TextFieldElement
     */
    muiRegister: UseMuiFormRegister<V>
    valid: UseFormValidReturn<V>
  }

export function isFormGqlOperation<
  V extends FieldValues,
  Q extends Record<string, unknown> = Record<string, unknown>,
>(form: UseFormReturn<V>): form is UseFormGqlMutationReturn<Q, V> {
  return typeof (form as UseFormGqlMutationReturn<Q, V>).muiRegister === 'function'
}

export function assertFormGqlOperation<
  V extends FieldValues,
  Q extends Record<string, unknown> = Record<string, unknown>,
>(form: UseFormReturn<V>): asserts form is UseFormGqlMutationReturn<Q, V> {
  if (typeof (form as UseFormGqlMutationReturn<Q, V>).muiRegister !== 'function') {
    throw Error(`form must be one of 'useFromGqlMutation' or 'useFormGqlQuery'`)
  }
}

/** Bindings between react-hook-form's useForm and Apollo Client's useMutation hook. */
export function useFormGqlMutation<Q extends Record<string, unknown>, V extends FieldValues>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useMutation(document, operationOptions)
  const operation = useFormGql({ document, form, tuple, ...options })
  const muiRegister = useFormMuiRegister(form)
  return { ...form, ...operation, muiRegister, valid: {} }
}
