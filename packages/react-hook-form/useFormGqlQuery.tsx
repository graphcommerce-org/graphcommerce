import { TypedDocumentNode } from '@apollo/client'
import { useForm } from 'react-hook-form'
import useFormGql, { UseFormGraphQlOptions } from './useFormGql'
import useLazyQueryPromise from './useLazyQueryPromise'

export default function useFormGqlQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
) {
  const form = useForm<V>(options)
  const tuple = useLazyQueryPromise(document)
  return useFormGql({ document, form, tuple, ...options })
}
