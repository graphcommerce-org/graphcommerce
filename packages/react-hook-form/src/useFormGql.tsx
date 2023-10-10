import {
  FetchResult,
  TypedDocumentNode,
  MutationTuple,
  ApolloError,
  LazyQueryResultTuple,
} from '@apollo/client'
import { useEffect, useRef } from 'react'
import { DefaultValues, FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'
import diff from './diff'
import { useGqlDocumentHandler, UseGqlDocumentHandler } from './useGqlDocumentHandler'

export type OnCompleteFn<Q, V> = (data: FetchResult<Q>, variables: V) => void | Promise<void>

type UseFormGraphQLCallbacks<Q, V> = {
  /**
   * Allows you to modify the variablels computed by the form to make it compatible with the GraphQL
   * Mutation. Also allows you to send false to skip submission.
   */
  onBeforeSubmit?: (variables: V) => V | false | Promise<V | false>
  onComplete?: OnCompleteFn<Q, V>
}

export type UseFormGraphQlOptions<Q, V extends FieldValues> = UseFormProps<V> &
  UseFormGraphQLCallbacks<Q, V>

export type UseFormGqlMethods<Q, V extends FieldValues> = Omit<
  UseGqlDocumentHandler<V>,
  'encode' | 'type'
> &
  Pick<UseFormReturn<V>, 'handleSubmit'> & { data?: Q | null; error?: ApolloError; submittedVariables?: V }

/**
 * Combines useMutation/useLazyQuery with react-hook-form's useForm:
 *
 * - Automatically extracts all required arguments for a query
 * - Casts Float/Int mutation input variables to a Number
 * - Updates the form when the query updates
 * - Resets the form after submitting the form when no modifications are found
 */
export function useFormGql<Q, V extends FieldValues>(
  options: {
    document: TypedDocumentNode<Q, V>
    form: UseFormReturn<V>
    tuple: MutationTuple<Q, V> | LazyQueryResultTuple<Q, V>
    defaultValues?: UseFormProps<V>['defaultValues']
  } & UseFormGraphQLCallbacks<Q, V>,
): UseFormGqlMethods<Q, V> {
  const { onComplete, onBeforeSubmit, document, form, tuple, defaultValues } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const [execute, { data, error }] = tuple

  const submittedVariables = useRef<V>()

  // automatically updates the default values
  const initital = useRef(true)
  const valuesString = JSON.stringify(defaultValues)
  useEffect(() => {
    if (initital.current) {
      initital.current = false
      return
    }
    if (defaultValues instanceof Promise) return
    form.reset(defaultValues as DefaultValues<V>, { keepDirtyValues: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesString, form])

  const handleSubmit: UseFormReturn<V>['handleSubmit'] = (onValid, onInvalid) =>
    form.handleSubmit(async (formValues, event) => {
      // Combine defaults with the formValues and encode
      submittedVariables.current = undefined
      let variables = encode({ ...defaultValues, ...formValues })

      // Wait for the onBeforeSubmit to complete
      if (onBeforeSubmit) {
        const res = await onBeforeSubmit(variables)
        if (res === false) return
        variables = res
      }
      // if (variables === false) onInvalid?.(formValues, event)

      submittedVariables.current = variables
      const result = await execute({ variables })
      if (onComplete && result.data) await onComplete(result, variables)

      // Reset the state of the form if it is unmodified afterwards
      if (typeof diff(form.getValues(), formValues) === 'undefined') form.reset(formValues)

      await onValid(formValues, event)
    }, onInvalid)

  return {
    ...gqlDocumentHandler,
    handleSubmit,
    data,
    error,
    submittedVariables: submittedVariables.current,
  }
}
