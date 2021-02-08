import {
  ApolloClient,
  ApolloError,
  FetchResult,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client'
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
import useGqlDocumentHandler from './useGqlDocumentHandler'

export * from 'react-hook-form'

export type OnCompleteFn<Q> = (
  data: FetchResult<Q>,
  client: ApolloClient<unknown>,
) => void | Promise<void>

/**
 * Combines useMutation with react-hook-form's useForm:
 *
 * - Automatically extracts all required arguments for a query
 * - Casts Float/Int mutation input variables to a Number
 * - Updates the form when the query updates
 * - Resets the form after submitting the form when no modifications are found
 */
export default function useFormGqlMutation<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormOptions<V> & {
    onBeforeSubmit?: (variables: V) => V | Promise<V>
    onComplete?: OnCompleteFn<Q>
  } = {},
) {
  const { onComplete, onBeforeSubmit, ...useFormProps } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const [mutate, { data, client }] = useMutation(document)

  type FieldValues = V & { submission?: string }
  const useFormMethods = useForm<FieldValues>(useFormProps)

  const submitMutation: SubmitHandler<V> = async (formValues) => {
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
