import { TypedDocumentNode, useMutation } from '@apollo/client'
import { useForm, UseFormMethods } from 'react-hook-form'
import useFormGql, { UseFormGqlMethods, UseFormGraphQlOptions } from './useFormGql'

export default function useFormGqlMutation<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
): UseFormGqlMethods<Q, V> & UseFormMethods<V> {
  const form = useForm<V>(options)
  const tuple = useMutation(document)
  return { ...form, ...useFormGql({ document, form, tuple, ...options }) }
}
