import {
  ApolloClient,
  ApolloError,
  FetchResult,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { useEffect } from 'react'
import {
  useForm,
  FieldName,
  UseFormOptions,
  DeepPartial,
  UnpackNestedValue,
  SubmitHandler,
  UseFormMethods,
} from 'react-hook-form'
import diff from './diff'
import { useGqlDocumentHandler } from './handlerFactory'

export * from 'react-hook-form'

export type OnCompleteFn<Q> = (
  data: FetchResult<Q>,
  client: ApolloClient<unknown>,
) => void | Promise<void>

function stripEmpty(formValues: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(formValues)
      .filter(Boolean)
      .filter((v) => v[1] !== ''),
  )
}

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
  const { onComplete, onBeforeSubmit, ...useFormProps } = options
  const { encode, validate, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const [mutate, { data, client }] = useMutation(document)

  type FieldValues = V & { submission?: string }
  const useFormMethods = useForm<FieldValues>(useFormProps)

  const submitMutation: SubmitHandler<V> = async (formValues) => {
    // Clear submission errors
    useFormMethods.clearErrors('submission' as FieldName<FieldValues>)

    // Combine defaults with the formValues
    let variables = encode({ ...useFormProps.defaultValues, ...stripEmpty(formValues) })

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

    // Reset the state of the form if it is unmodified afterwards
    if (typeof diff(useFormMethods.getValues(), formValues) === 'undefined')
      useFormMethods.reset(formValues as UnpackNestedValue<DeepPartial<FieldValues>>)
  }

  type HandleSubmit = UseFormMethods<V>['handleSubmit']
  const handleSubmit: HandleSubmit = (onValid, onInvalid) =>
    useFormMethods.handleSubmit(async (values, event) => {
      await submitMutation(values, event)
      // @ts-expect-error For some reason it is not accepting the value here
      await onValid(values, event)
    }, onInvalid)

  return { ...gqlDocumentHandler, ...useFormMethods, handleSubmit, data }
}
