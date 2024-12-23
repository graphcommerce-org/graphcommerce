import type {
  FetchResult,
  LazyQueryHookOptions,
  LazyQueryResultTuple,
  MaybeMasked,
  MutationHookOptions,
  MutationTuple,
  TypedDocumentNode,
} from '@apollo/client'
import { ApolloError, isApolloError } from '@apollo/client'
import { getOperationName } from '@apollo/client/utilities'
import useEventCallback from '@mui/utils/useEventCallback'
import { useEffect, useRef } from 'react'
import type { DefaultValues, FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'
import diff from './diff'
import type { UseGqlDocumentHandler } from './useGqlDocumentHandler'
import { useGqlDocumentHandler } from './useGqlDocumentHandler'
import { tryAsync } from './utils/tryTuple'

export type OnCompleteFn<Q, V> = (
  data: FetchResult<MaybeMasked<Q>>,
  variables: V,
) => void | Promise<void>

type UseFormGraphQLCallbacks<Q, V> = {
  /**
   * Allows you to modify the variablels computed by the form to make it compatible with the GraphQL
   * Mutation.
   *
   * When returning false, it will silently stop the submission. When an error is thrown, it will be
   * set as an ApolloError
   */
  onBeforeSubmit?: (variables: V) => V | false | Promise<V | false>
  /**
   * Called after the mutation has been executed. Allows you to handle the result of the mutation.
   *
   * When an error is thrown, it will be set as an ApolloError
   */
  onComplete?: OnCompleteFn<Q, V>

  /**
   * @deprecated Not used anymore, is now the default
   *
   *   Changes:
   *
   *   - Restores `defaultValues` functionality to original functionality, use `values` instead.
   *   - Does not reset the form after submission, use `values` instead.
   *   - Does not 'encode' the variables, use onBeforeSubmit instead.
   *
   *   Future plans:
   *
   *   - Remove the useMutation/useLazyQuery tuple and use a reguler client.mutation() call.
   *   - Write graphql errors to setError('root')
   *   - Remove onBeforeSubmit, onComplete and the handleSubmit rewrite with a single mutate() callback.
   *
   *   ```ts
   *   const { handleSubmit } = useFormGqlMutation()
   *
   *   const submit = handleSubmit((formValues, mutate) => {
   *     // onBeforeSubmit now simply is code before mutate() where you can return early for example or set errors.
   *     const result = mutate() // executes the mutation and automatically sets generic errors with setError('root')
   *     // onComplete: now simply use the result after the form, to for example reset the form, or do other things.
   *   })
   *   ```
   */
  experimental_useV2?: boolean
  /**
   * To restore the previous functionality of the useFormGqlMutation, set this to true.
   *
   * @deprecated Will be removed in the next version.
   */
  deprecated_useV1?: boolean

  /**
   * Only submit the form when there are dirty fields. If all fields are clean, we skip the
   * submission.
   *
   * Form is still set to isSubmitted and isSubmitSuccessful.
   */
  skipUnchanged?: boolean
}

export type UseFormGraphQlOptions<Q, V extends FieldValues> = UseFormProps<V> &
  UseFormGraphQLCallbacks<Q, V>

export type UseFormGqlMethods<Q, V extends FieldValues> = Omit<
  UseGqlDocumentHandler<V>,
  'encode' | 'type'
> &
  Pick<UseFormReturn<V>, 'handleSubmit'> & {
    data?: MaybeMasked<Q> | null
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
    operationOptions?:
      | Omit<MutationHookOptions<Q, V>, 'fetchPolicy' | 'variables'>
      | Omit<LazyQueryHookOptions<Q, V>, 'fetchPolicy' | 'variables'>
    defaultValues?: UseFormProps<V>['defaultValues']
    skipUnchanged?: boolean
  } & UseFormGraphQLCallbacks<Q, V>,
): UseFormGqlMethods<Q, V> {
  const {
    onComplete,
    onBeforeSubmit,
    document,
    form,
    tuple,
    operationOptions,
    skipUnchanged,
    defaultValues,
    deprecated_useV1 = false,
  } = options
  const { encode, type, ...gqlDocumentHandler } = useGqlDocumentHandler<Q, V>(document)
  const [execute, { data, error, loading }] = tuple

  const submittedVariables = useRef<V>()
  const returnedError = useRef<ApolloError>()

  // automatically updates the default values
  const initital = useRef(true)
  const controllerRef = useRef<AbortController | undefined>()
  const valuesString = JSON.stringify(defaultValues)
  useEffect(() => {
    if (!deprecated_useV1) return

    if (initital.current) {
      initital.current = false
      return
    }
    if (defaultValues instanceof Promise) return
    form.reset(defaultValues as DefaultValues<V>, { keepDirtyValues: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesString, form])

  const beforeSubmit = useEventCallback(
    tryAsync((onBeforeSubmit ?? ((v) => v)) satisfies NonNullable<typeof onBeforeSubmit>),
  )
  const complete = useEventCallback(
    tryAsync((onComplete ?? (() => undefined)) satisfies NonNullable<typeof onComplete>),
  )

  const handleSubmit: UseFormReturn<V>['handleSubmit'] = (onValid, onInvalid) =>
    form.handleSubmit(async (formValues, event) => {
      const hasDirtyFields = skipUnchanged
        ? Object.values(form?.formState.dirtyFields ?? []).filter(Boolean).length > 0
        : true

      if (skipUnchanged && !hasDirtyFields) {
        console.info(
          `[useFormGql ${getOperationName(document)}] skipped submission, no dirty fields`,
        )
        await onValid(formValues, event)
        return
      }

      returnedError.current = undefined
      submittedVariables.current = undefined

      // Combine defaults with the formValues and encode
      let variables = !deprecated_useV1 ? formValues : encode({ ...defaultValues, ...formValues })

      // Wait for the onBeforeSubmit to complete
      const [onBeforeSubmitResult, onBeforeSubmitError] = await beforeSubmit(variables)
      if (onBeforeSubmitError) {
        if (isApolloError(onBeforeSubmitError)) {
          returnedError.current = onBeforeSubmitError
          form.setError('root', { message: onBeforeSubmitError.message })
        } else {
          const message =
            process.env.NODE_ENV === 'development'
              ? `A non ApolloError was thrown during the onBeforeSubmit handler: ${onBeforeSubmitError.message}`
              : 'An unexpected error occurred, please contact the store owner'
          form.setError('root', { message })
          returnedError.current = new ApolloError({ graphQLErrors: [{ message }] })
        }
        return
      }

      if (onBeforeSubmitResult === false) {
        form.setError('root', { message: 'Form submission cancelled' })
        return
      }

      variables = onBeforeSubmitResult

      submittedVariables.current = variables
      if (!deprecated_useV1 && loading) controllerRef.current?.abort()
      controllerRef.current = new window.AbortController()

      const result = await execute({
        ...operationOptions,
        variables,
        context: {
          ...operationOptions?.context,
          fetchOptions: {
            ...operationOptions?.context?.fetchOptions,
            signal: controllerRef.current.signal,
          },
        },
      })

      // If there are submission errors, set the error and return
      if (result.errors && result.errors.length > 0) {
        form.setError('root', { message: result.errors.map((e) => e.message).join(', ') })
        return
      }

      const [, onCompleteError] = await complete(result, variables)
      if (onCompleteError) {
        if (isApolloError(onCompleteError)) {
          returnedError.current = onCompleteError
          form.setError('root', { message: onCompleteError.message })
        } else {
          const message =
            process.env.NODE_ENV === 'development'
              ? `A non ApolloError was thrown during the onComplete handler: ${onCompleteError.message}`
              : 'An unexpected error occurred, please contact the store owner'
          form.setError('root', { message })
          returnedError.current = new ApolloError({ graphQLErrors: [{ message }] })
        }
        return
      }

      if (deprecated_useV1 && typeof diff(form.getValues(), formValues) === 'undefined')
        // Reset the state of the form if it is unmodified afterwards
        form.reset(formValues)

      await onValid(formValues, event)
    }, onInvalid)

  return {
    ...gqlDocumentHandler,
    handleSubmit,
    data,
    error: returnedError.current ?? error,
    submittedVariables: submittedVariables.current,
  }
}
