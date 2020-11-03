import { ApolloClient, FetchResult, TypedDocumentNode, useMutation } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { useEffect } from 'react'
import { FieldName, useForm } from 'react-hook-form'
import { UnpackNestedValue, UseFormOptions } from 'react-hook-form/dist/types/form'
import { DeepPartial } from 'react-hook-form/dist/types/utils'
import { useGqlDocumentHandler } from './handlerFactory'

export * from 'react-hook-form'

export type OnCompleteFn<Q> = (
  data: FetchResult<Q>,
  client: ApolloClient<unknown>,
) => void | Promise<void>

/**
 * Combines useMutation with react-hook-form:
 *
 * - Automatically extracts all required arguments for a query
 * - Casts Float/Int mutation input variables to a Number
 * - Updates the form when the query updates
 */
export function useMutationForm<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormOptions<V> & {
    onBeforeSubmit?: (variables: V) => V | Promise<V>
    onComplete?: OnCompleteFn<Q>
  } = {},
) {
  const { defaultValues, onComplete, onBeforeSubmit, ...useFormProps } = options
  const { defaults, required, encode, validate, Field } = useGqlDocumentHandler<Q, V>(document)
  const [mutate, { data, client }] = useMutation(document, { errorPolicy: 'all' })

  type FieldValues = V & { submission?: string }
  const { reset, handleSubmit: submitForm, ...useFormMethods } = useForm<FieldValues>({
    defaultValues: mergeDeep(defaults, defaultValues),
    ...useFormProps,
  })

  const valuesJson = JSON.stringify(defaultValues || '{}')
  useEffect(() => {
    if (valuesJson) {
      const changeValues = JSON.parse(valuesJson) as UnpackNestedValue<DeepPartial<V>>
      reset(changeValues)
    }
  }, [valuesJson, reset])

  const handleSubmit = submitForm(async (formValues) => {
    // Clear submission errors
    useFormMethods.clearErrors('submission' as FieldName<FieldValues>)

    // Combine all values
    let variables = encode({ ...mergeDeep(defaults, defaultValues), ...formValues })

    // Wait for the onBeforeSubmit to complete
    if (onBeforeSubmit) variables = await onBeforeSubmit(variables)

    // Validate any missing fields
    const missing = validate(variables)
    if (missing.length) throw new Error(`Missing fields in form: ${missing.join(', ')}`)

    // Encode and submit the values
    const queryResult = await mutate({ variables })

    // Register submission errors
    if (queryResult.errors) {
      useFormMethods.setError('submission' as FieldName<FieldValues>, {
        type: 'validate',
        message: queryResult.errors.map((error) => error.message).join(', '),
      })
    }

    // Wait for the onComplete result
    if (onComplete && queryResult.data) await onComplete(queryResult, client)
  })

  return { Field, required, data, reset, handleSubmit, ...useFormMethods }
}
