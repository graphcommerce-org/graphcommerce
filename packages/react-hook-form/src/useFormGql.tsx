import {
  FetchResult,
  TypedDocumentNode,
  MutationTuple,
  ApolloError,
  LazyQueryResultTuple,
} from '@apollo/client'
import useEventCallback from '@mui/utils/useEventCallback'
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

  /**
   * Changes:
   * - Restores `defaultValues` functionality to original functionality, use `values` instead.
   * - Does not reset the form after submission, use `values` instead.
   * - Does not 'encode' the variables, use onBeforeSubmit instead.
   *
   * Future plans:
   * - Remove the useMutation/useLazyQuery tuple and use a reguler client.mutation() call.
   * - Write graphql errors to setError('root')
   * - Remove onBeforeSubmit, onComplete and the handleSubmit rewrite with a single mutate() callback.
   *
   *
   * ```ts
   * const { handleSubmit } = useFormGqlMutation();
   *
   * const submit = handleSubmit((formValues, mutate) => {
   *    // onBeforeSubmit now simply is code before mutate() where you can return early for example or set errors.
   *    const result = mutate() // executes the mutation and automatically sets generic errors with setError('root')
   *    // onComplete: now simply use the result after the form, to for example reset the form, or do other things.
   * })
   * ```
   */
  experimental_useV2?: boolean
}

export type UseFormGraphQlOptions<Q, V extends FieldValues> = UseFormProps<V> &
  UseFormGraphQLCallbacks<Q, V>

export type UseFormGqlMethods<Q, V extends FieldValues> = Omit<
  UseGqlDocumentHandler<V>,
  'encode' | 'type'
> &
  Pick<UseFormReturn<V>, 'handleSubmit'> & {
    data?: Q | null
    error?: ApolloError
    submittedVariables?: V
  }

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
  const {
    onComplete,
    onBeforeSubmit,
    document,
    form,
    tuple,
    defaultValues,
    experimental_useV2 = false,
  } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const [execute, { data, error, loading }] = tuple

  const submittedVariables = useRef<V>()

  // automatically updates the default values
  const initital = useRef(true)
  const controllerRef = useRef<AbortController | undefined>()
  const valuesString = JSON.stringify(defaultValues)
  useEffect(() => {
    if (experimental_useV2) return

    if (initital.current) {
      initital.current = false
      return
    }
    if (defaultValues instanceof Promise) return
    form.reset(defaultValues as DefaultValues<V>, { keepDirtyValues: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesString, form])

  const beforeSubmit: NonNullable<typeof onBeforeSubmit> = useEventCallback(
    onBeforeSubmit ?? ((v) => v),
  )
  const complete: NonNullable<typeof onComplete> = useEventCallback(onComplete ?? (() => undefined))

  const handleSubmit: UseFormReturn<V>['handleSubmit'] = (onValid, onInvalid) =>
    form.handleSubmit(async (formValues, event) => {
      // Combine defaults with the formValues and encode
      submittedVariables.current = undefined
      let variables = experimental_useV2 ? formValues : encode({ ...defaultValues, ...formValues })

      // Wait for the onBeforeSubmit to complete
      const res = await beforeSubmit(variables)
      if (res === false) return
      variables = res

      // if (variables === false) onInvalid?.(formValues, event)

      submittedVariables.current = variables
      if (loading && experimental_useV2) controllerRef.current?.abort()
      controllerRef.current = new window.AbortController()
      const result = await execute({
        variables,
        context: { fetchOptions: { signal: controllerRef.current.signal } },
      })

      if (result.data) await complete(result, variables)

      // Reset the state of the form if it is unmodified afterwards
      if (typeof diff(form.getValues(), formValues) === 'undefined' && !experimental_useV2)
        form.reset(formValues)

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
