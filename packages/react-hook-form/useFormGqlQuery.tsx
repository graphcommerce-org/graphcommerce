import { ApolloClient, FetchResult, TypedDocumentNode, useLazyQuery } from '@apollo/client'
import {
  useForm,
  FieldName,
  UseFormOptions,
  SubmitHandler,
  UseFormMethods,
  FormStateProxy,
} from 'react-hook-form'

import useGqlDocumentHandler from './useGqlDocumentHandler'

/**
 * Combines useLazyQuery with react-hook-form's useForm:
 *
 * - Automatically extracts all required arguments for a query
 * - Casts Float/Int mutation input variables to a Number
 * - Updates the form when the query updates
 * - Resets the form after submitting the form when no modifications are found
 */
export default function useFormGqlLazyQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormOptions<V> & {
    onBeforeSubmit?: (variables: V) => V | Promise<V>
  } = {},
) {
  const { onBeforeSubmit, ...useFormProps } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)

  const [execute, { data, error, loading }] = useLazyQuery(document)

  type FieldValues = V & { submission?: string }
  const useFormMethods = useForm<FieldValues>(useFormProps)

  const formState = new Proxy(useFormMethods.formState, {
    get(target, prop: keyof FormStateProxy) {
      if (prop === 'isSubmitting' && loading) return true
      return target[prop]
    },
  })

  const submit: SubmitHandler<V> = async (formValues) => {
    // Clear submission errors
    useFormMethods.clearErrors('submission' as FieldName<FieldValues>)

    // Combine defaults with the formValues and encode
    let variables = encode({
      ...useFormProps.defaultValues,
      ...(formValues as Record<string, unknown>),
    })

    // Wait for the onBeforeSubmit to complete
    if (onBeforeSubmit) variables = await onBeforeSubmit(variables)

    try {
      // Encode and submit the values
      execute({ variables })
    } catch (e) {
      //
    }
  }

  type HandleSubmit = UseFormMethods<V>['handleSubmit']
  const handleSubmit: HandleSubmit = (onValid, onInvalid) =>
    useFormMethods.handleSubmit(async (values, event) => {
      await submit(values, event)
      // @ts-expect-error For some reason it is not accepting the value here
      await onValid(values, event)
    }, onInvalid)

  return { ...gqlDocumentHandler, ...useFormMethods, formState, handleSubmit, data, error }
}
