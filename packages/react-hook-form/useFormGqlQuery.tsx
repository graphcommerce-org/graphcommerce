import { TypedDocumentNode } from '@apollo/client'
import { useForm, UseFormMethods } from 'react-hook-form'
import useFormGql, { UseFormGqlMethods, UseFormGraphQlOptions } from './useFormGql'
import useLazyQueryPromise from './useLazyQueryPromise'

export default function useFormGqlQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
): UseFormGqlMethods<Q, V> & UseFormMethods<V> {
  const form = useForm<V>(options)
  const tuple = useLazyQueryPromise(document)
  return { ...form, ...useFormGql({ document, form, tuple, ...options }) }
}
