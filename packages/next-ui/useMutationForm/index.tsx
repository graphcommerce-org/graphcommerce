import {
  ApolloClient,
  ApolloError,
  FetchResult,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { useEffect } from 'react'
import { useForm, FieldName } from 'react-hook-form'
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
  const [mutate, { data, client }] = useMutation(document)

  type FieldValues = V & { submission?: string }
  const { reset, ...useFormMethods } = useForm<FieldValues>({
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

  const handleSubmit = useFormMethods.handleSubmit(async (formValues) => {
    // Clear submission errors
    useFormMethods.clearErrors('submission' as FieldName<FieldValues>)

    // Combine all values
    let variables = encode({ ...mergeDeep(defaults, defaultValues), ...formValues })

    // Wait for the onBeforeSubmit to complete
    if (onBeforeSubmit) variables = await onBeforeSubmit(variables)

    // Validate any missing fields
    const missing = validate(variables)
    if (missing.length) throw new Error(`Missing fields in form: ${missing.join(', ')}`)

    try {
      // Encode and submit the values
      const result = await mutate({ variables })

      // Register submission errors
      if (result.errors) {
        useFormMethods.setError('submission' as FieldName<FieldValues>, {
          type: 'validate',
          message: result.errors.map((error) => error.message).join(', '),
        })
      }
      if (onComplete && result.data) await onComplete(result, client)
    } catch (e) {
      if (e instanceof ApolloError) {
        useFormMethods.setError('submission' as FieldName<FieldValues>, {
          type: 'validate',
          message: e.message,
        })
      } else throw e
    }

    // Wait for the onComplete result
    // reset(formValues as UnpackNestedValue<DeepPartial<FieldValues>>)
  })

  return { Field, required, data, reset, ...useFormMethods, handleSubmit }
}
