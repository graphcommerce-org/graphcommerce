import { ApolloError } from '@apollo/client'
import React, { useContext, useEffect, useRef } from 'react'
import { isFormGqlOperation } from '../useFormGqlMutation'
import { composedFormContext } from './context'
import type { ComposedSubmitRenderComponentProps } from './types'

export type ComposedSubmitProps = {
  onSubmitSuccessful?: () => void
  render: React.FC<ComposedSubmitRenderComponentProps>
}

export function mergeErrors(errors: ApolloError[]): ApolloError | undefined {
  if (!errors.length) return undefined
  return new ApolloError({
    errorMessage: 'Composed submit error',
    networkError: errors.find((error) => error.networkError)?.networkError,
    graphQLErrors: errors.map((error) => error.graphQLErrors ?? []).flat(1),
  })
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

  const errors: ApolloError[] = []

  formEntries.forEach(([, { form }]) => {
    if (form && isFormGqlOperation(form) && form.error) errors.push(form.error)
  })

  return <Render buttonState={buttonState} submit={submitAll} error={mergeErrors(errors)} />
}
