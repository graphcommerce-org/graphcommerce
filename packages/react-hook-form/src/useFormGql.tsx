import {
  FetchResult,
  ApolloClient,
  TypedDocumentNode,
  useApolloClient,
  MutationTuple,
  ApolloError,
} from '@apollo/client'
import { UseFormProps, UseFormReturn, UnpackNestedValue, DeepPartial } from 'react-hook-form'
import diff from './diff'
import { useGqlDocumentHandler, UseGqlDocumentHandler } from './useGqlDocumentHandler'
import { LazyQueryTuple } from './useLazyQueryPromise'

export type OnCompleteFn<Q> = (
  data: FetchResult<Q>,
  client: ApolloClient<unknown>,
) => void | Promise<void>

type UseFormGraphQLCallbacks<Q, V> = {
  onBeforeSubmit?: (variables: V) => V | Promise<V>
  onComplete?: OnCompleteFn<Q>
}

export type UseFormGraphQlOptions<Q, V> = UseFormProps<V> & UseFormGraphQLCallbacks<Q, V>

export type UseFormGqlMethods<Q, V> = Omit<UseGqlDocumentHandler<V>, 'encode' | 'type'> &
  Pick<UseFormReturn<V>, 'handleSubmit'> & { data?: Q | null; error?: ApolloError }

/**
 * Combines useMutation/useLazyQueryPromise with react-hook-form's useForm:
 *
 * - Automatically extracts all required arguments for a query
 * - Casts Float/Int mutation input variables to a Number
 * - Updates the form when the query updates
 * - Resets the form after submitting the form when no modifications are found
 */
export function useFormGql<Q, V>(
  options: {
    document: TypedDocumentNode<Q, V>
    form: UseFormReturn<V>
    tuple: MutationTuple<Q, V> | LazyQueryTuple<Q, V>
    defaultValues?: UseFormProps<V>['defaultValues']
  } & UseFormGraphQLCallbacks<Q, V>,
): UseFormGqlMethods<Q, V> {
  const { onComplete, onBeforeSubmit, document, form, tuple, defaultValues } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const [execute, { data, error }] = tuple
  const client = useApolloClient()

  const handleSubmit: UseFormReturn<V>['handleSubmit'] = (onValid, onInvalid) =>
    form.handleSubmit(async (formValues, event) => {
      // Combine defaults with the formValues and encode
      let variables = encode({
        ...defaultValues,
        ...(formValues as Record<string, unknown>),
      })

      // Wait for the onBeforeSubmit to complete
      if (onBeforeSubmit) variables = await onBeforeSubmit(variables)

      const result = await execute({ variables })
      if (onComplete && result.data) await onComplete(result, client)

      // Reset the state of the form if it is unmodified afterwards
      if (typeof diff(form.getValues(), formValues) === 'undefined')
        form.reset(formValues as UnpackNestedValue<DeepPartial<V>>)

      // @ts-expect-error For some reason it is not accepting the value here
      await onValid(formValues, event)
    }, onInvalid)

  return { ...gqlDocumentHandler, handleSubmit, data, error }
}
