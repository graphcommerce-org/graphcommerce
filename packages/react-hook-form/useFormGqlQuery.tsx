import { TypedDocumentNode } from '@apollo/client'
import { useForm } from 'react-hook-form'
import useFormGql, { UseFormGraphQlOptions } from './useFormGql'
import { UseFormGqlOperationReturn } from './useFormGqlMutation'
import useFormMuiRegister from './useFormMaterialRegister'
import useFormValid from './useFormValidFields'
import useLazyQueryPromise from './useLazyQueryPromise'

export default function useFormGqlQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
): UseFormGqlOperationReturn<Q, V> {
  const form = useForm<V>(options)
  const tuple = useLazyQueryPromise(document)
  const operation = useFormGql({ document, form, tuple, ...options })
  const muiRegister = useFormMuiRegister(form)
  const valid = useFormValid(form, operation.required)

  return { ...form, ...operation, valid, muiRegister }
}
