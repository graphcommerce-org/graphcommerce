import { ApolloError } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { isFormGqlOperation } from '../useFormGqlMutation'
import { composedFormContext } from './context'
import { ComposedSubmitRenderComponentProps } from './types'

export type ComposedSubmitProps = {
  onSubmitSuccessful?: () => void
  render: React.FC<ComposedSubmitRenderComponentProps>
}

export function mergeErrors(errors: ApolloError[]): ApolloError | undefined {
  return new ApolloError({
    errorMessage: 'Composed submit error',
    networkError: errors.find((error) => error.networkError)?.networkError,
    graphQLErrors: errors.map((error) => error.graphQLErrors ?? []).flat(1),
  })
}

export default function ComposedSubmit(props: ComposedSubmitProps) {
  const { render: Render, onSubmitSuccessful } = props
  const [state, dispatch] = useContext(composedFormContext)
  const { formState, buttonState, isCompleting, forms } = state

  const formEntries = Object.entries(forms).sort((a, b) => a[1].step - b[1].step)

  useEffect(() => {
    if (isCompleting && !formState.isSubmitting) {
      /**
       * If we have forms that are invalid, we don't need to submit anything yet. We can trigger the
       * submission of the invalid forms and highlight those forms.
       */
      const isSubmitSuccessful = !formEntries.some(
        ([, f]) => Object.keys(f.form.formState.errors).length > 0,
      )

      dispatch({ type: 'SUBMITTED', isSubmitSuccessful })
      if (isSubmitSuccessful) onSubmitSuccessful?.()
    }
  }, [isCompleting, dispatch, formEntries, formState.isSubmitting, onSubmitSuccessful])

  /** Callback to submit all forms */
  const submitAll = async () => {
    /**
     * If we have forms that are have errors, we don't need to submit anything yet. We can trigger
     * the submission of the invalid forms and highlight those forms.
     */
    let formsToSubmit = formEntries.filter(
      ([, f]) => Object.keys(f.form.formState.errors).length > 0,
    )

    /** If we have invalid forms we can submit those and show errors */
    if (!formsToSubmit.length)
      formsToSubmit = formEntries.filter(([, f]) => !f.form.formState.isValid)

    // We have no errors or invalid forms
    if (!formsToSubmit.length) formsToSubmit = formEntries

    dispatch({ type: 'SUBMIT' })

    /**
     * We're executing these steps all in sequence, since certain forms can depend on other forms in
     * the backend.
     *
     * Todo: There might be a performance optimization by submitting multiple forms in parallel.
     */
    // eslint-disable-next-line no-await-in-loop
    for (const [, { submit }] of formsToSubmit) await submit()

    dispatch({ type: 'SUBMITTING' })
  }

  const errors: ApolloError[] = []
  formEntries.forEach(([, { form }]) => {
    if (isFormGqlOperation(form) && form.error) errors.push(form.error)
  })

  return <Render buttonState={buttonState} submit={submitAll} error={mergeErrors(errors)} />
}
