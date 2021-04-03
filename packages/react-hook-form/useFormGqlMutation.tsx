import { TypedDocumentNode, useMutation } from '@apollo/client'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import useFormGqlOperation, { UseFormGqlMethods, UseFormGraphQlOptions } from './useFormGql'
import useFormMuiRegister, { UseMuiFormRegister } from './useFormMaterialRegister'
import useFormValid, { UseFormValidReturn } from './useFormValidFields'

export type UseFormGqlOperationReturn<
  Q extends Record<string, any> = Record<string, any>,
  V extends Record<string, any> = Record<string, any>
> = UseFormGqlMethods<Q, V> &
  UseFormReturn<V> & { muiRegister: UseMuiFormRegister<V>; valid: UseFormValidReturn<V> }

export function assertFormGqlOperation<V, Q = Record<string, unknown>>(
  form: UseFormReturn<V>,
): asserts form is UseFormGqlOperationReturn<Q, V> {
  if (typeof (form as UseFormGqlOperationReturn<Q, V>).muiRegister !== 'undefined') {
    throw Error(`form must be one of 'useFromGqlMutation' or 'useFormGqlQuery'`)
  }
}

export default function useFormGqlMutation<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
): UseFormGqlOperationReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useMutation(document)
  const operation = useFormGqlOperation({ document, form, tuple, ...options })
  const muiRegister = useFormMuiRegister(form)
  const valid = useFormValid(form, operation.required)

  return { ...form, ...operation, valid, muiRegister }
}
