import { TypedDocumentNode, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import useFormGql, { UseFormGraphQlOptions } from './useFormGql'

export default function useFormGqlMutation<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
) {
  const form = useForm<V>(options)
  const tuple = useMutation(document)
  return useFormGql({ document, form, tuple, ...options })
}
