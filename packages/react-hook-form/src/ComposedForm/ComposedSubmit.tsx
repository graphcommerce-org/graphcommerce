import type { ErrorLike } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import type React from 'react'
import { useContext, useEffect, useRef } from 'react'
import { isFormGqlOperation } from '../useFormGqlMutation'
import { composedFormContext } from './context'
import type { ComposedSubmitRenderComponentProps } from './types'

export type ComposedSubmitProps = {
  onSubmitSuccessful?: () => void
  render: React.FC<ComposedSubmitRenderComponentProps>
}

export function mergeErrors(errors: ErrorLike[]): ErrorLike | undefined {
  if (!errors.length) return undefined

  // Collect all GraphQL errors from CombinedGraphQLErrors instances
  const graphQLErrors = errors.flatMap((error) =>
    CombinedGraphQLErrors.is(error) ? error.errors : [],
  )

  // Collect non-GraphQL errors (network errors, etc.)
  const nonGraphQLErrors = errors.filter((error) => !CombinedGraphQLErrors.is(error))

  // If we have GraphQL errors, return a CombinedGraphQLErrors
  // Include non-GraphQL error messages as additional GraphQL errors to avoid losing them
  if (graphQLErrors.length > 0) {
    const allErrors = [
      ...graphQLErrors,
      ...nonGraphQLErrors.map((error) => ({ message: error.message })),
    ]
    return new CombinedGraphQLErrors({ errors: allErrors })
  }

  // If we only have non-GraphQL errors, return the first one
  return nonGraphQLErrors[0]
}

export function ComposedSubmit(props: ComposedSubmitProps) {
  const { render: Render, onSubmitSuccessful } = props
  const [formContext, dispatch] = useContext(composedFormContext)
  const { formState, buttonState, isCompleting, forms } = formContext
  const thisComponent = useRef(false)

  const formEntries = Object.entries(forms).sort((a, b) => a[1].step - b[1].step)

  useEffect(() => {
    if (isCompleting && !formState.isSubmitting && thisComponent.current) {
      /**
       * If we have forms that are invalid, we don't need to submit anything yet. We can trigger the
       * submission of the invalid forms and highlight those forms.
       */
      const isSubmitSuccessful = !formEntries.some(
        ([, f]) => Object.keys(f.form?.formState.errors ?? {}).length > 0,
      )

      dispatch({ type: 'SUBMITTED', isSubmitSuccessful })
      if (isSubmitSuccessful) onSubmitSuccessful?.()
      thisComponent.current = false
    }
  }, [isCompleting, dispatch, formEntries, formState.isSubmitting, onSubmitSuccessful])

  /** Callback to submit all forms */
  const submitAll = async () => {
    /**
     * If we have forms that are have errors, we don't need to actually submit anything yet. We can
     * trigger the submission of the invalid forms and highlight the errors in those forms.
     */
    dispatch({ type: 'SUBMIT' })

    const invalidKeys: string[] = []
    for (const [, { form, key }] of formEntries) {
      // eslint-disable-next-line no-await-in-loop
      const result = await form?.trigger()
      if (result === false) invalidKeys.push(key)
    }

    let formsToProcess = formEntries
    if (invalidKeys.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(
          '[ComposedForm] All forms are valid, submitting...',
          formsToProcess.map(([, { key }]) => key),
        )
      }
    } else {
      formsToProcess = formEntries.filter(([, { key }]) => invalidKeys.includes(key))
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(
          '[ComposedForm] Found invalid forms, triggering error messages by submitting...',
          Object.fromEntries(
            formsToProcess.map(([, { key, form }]) => [
              key,
              `Invalid fields ${(form?.formState.errors
                ? Object.keys(form.formState.errors)
                : []
              ).join(', ')}`,
            ]),
          ),
        )
      }
    }

    try {
      /**
       * We're executing these steps all in sequence, since certain forms can depend on other forms
       * in the backend.
       */
      for (const [, { submit, key }] of formsToProcess) {
        try {
          // eslint-disable-next-line no-console
          console.log(`[ComposedForm] Submitting ${key}`)
          // eslint-disable-next-line no-await-in-loop
          await submit?.()
        } catch (e) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(
              `[ComposedForm] The form ${key} has thrown an Error during submission, halting submissions`,
              e,
            )
          }
          throw e
        }
      }

      if (invalidKeys.length === 0) {
        thisComponent.current = true
        dispatch({ type: 'SUBMITTING' })
      } else {
        dispatch({ type: 'SUBMITTED', isSubmitSuccessful: false })
      }
    } catch (error) {
      dispatch({ type: 'SUBMITTED', isSubmitSuccessful: false })
    }
  }

  const errors: ErrorLike[] = []

  formEntries.forEach(([, { form }]) => {
    if (form && isFormGqlOperation(form) && form.error) errors.push(form.error)
  })

  return <Render buttonState={buttonState} submit={submitAll} error={mergeErrors(errors)} />
}
