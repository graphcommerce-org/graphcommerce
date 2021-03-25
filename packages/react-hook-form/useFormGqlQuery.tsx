import { TypedDocumentNode, useApolloClient } from '@apollo/client'
import {
  useForm,
  UseFormOptions,
  UseFormMethods,
  DeepPartial,
  UnpackNestedValue,
} from 'react-hook-form'
import diff from './diff'
import { OnCompleteFn } from './useFormGql'

import useGqlDocumentHandler from './useGqlDocumentHandler'
import useLazyQueryPromise from './useLazyQueryPromise'

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
    onComplete?: OnCompleteFn<Q>
  } = {},
) {
  const { onComplete, onBeforeSubmit, ...useFormProps } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const client = useApolloClient()
  const [execute, { data, error }] = useLazyQueryPromise(document)

  type FieldValues = V & { submission?: string }
  const form = useForm<FieldValues>(useFormProps)

  const handleSubmit: UseFormMethods<V>['handleSubmit'] = (onValid, onInvalid) =>
    form.handleSubmit(async (formValues, event) => {
      // Combine defaults with the formValues and encode
      let variables = encode({
        ...useFormProps.defaultValues,
        ...(formValues as Record<string, unknown>),
      })

      // Wait for the onBeforeSubmit to complete
      if (onBeforeSubmit) variables = await onBeforeSubmit(variables)

      try {
        const result = await execute({ variables })
        if (onComplete && result.data) await onComplete(result, client)
      } catch (e) {
        return
      }

      // Reset the state of the form if it is unmodified afterwards
      if (typeof diff(form.getValues(), formValues) === 'undefined')
        form.reset(formValues as UnpackNestedValue<DeepPartial<FieldValues>>)
      // @ts-expect-error For some reason it is not accepting the value here
      await onValid(formValues, event)
    }, onInvalid)

  return { ...gqlDocumentHandler, ...form, handleSubmit, data, error }
}
