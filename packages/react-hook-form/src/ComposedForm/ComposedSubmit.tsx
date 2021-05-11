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
  const [{ formState, buttonState, forms }, dispatch] = useContext(composedFormContext)
  const formEntries = Object.entries(forms).sort((a, b) => a[1].step - b[1].step)

  /**
   * If we have forms that are invalid, we don't need to submit anything yet. We can trigger the
   * submission of the invalid forms and highlight those forms.
   */
  let formsToSubmit = formEntries.filter(
    ([, f]) =>
      // if (!f.form.formState.isValid !== Object.keys(f.form.formState.errors).length > 0) {
      //   console.warn(`formState.isValid doesn't match formState.errors, missing a ref? ${f.key}?`)
      // }
      Object.keys(f.form.formState.errors).length > 0,
  )

  if (!formsToSubmit.length) formsToSubmit = formEntries

  /**
   * We filter out all the forms that have no dirtyFields and the form does not have isDirty
   *
   * Todo: We need to know wheter we are allowed to trigger onSubmitSuccessful, because
   * isSubmitSuccessful will not be set to true on the redundant forms.
   */
  formsToSubmit.filter(
    ([, f]) => f.form.formState.isDirty || Object.keys(f.form.formState.dirtyFields).length > 0,
  )

  const errors: ApolloError[] = []
  formEntries.forEach(([, { form }]) => {
    if (isFormGqlOperation(form) && form.error) errors.push(form.error)
  })

  useEffect(() => {
    if (buttonState.isSubmitting) {
      const isSubmitSuccessful =
        formsToSubmit.length === 0
          ? true
          : formsToSubmit.every(([, f]) => f.form.formState.isSubmitSuccessful)
      dispatch({ type: 'FINISH', isSubmitSuccessful })
      if (isSubmitSuccessful) onSubmitSuccessful?.()
    }
  }, [
    buttonState.isSubmitting,
    dispatch,
    formState.isSubmitSuccessful,
    formsToSubmit,
    onSubmitSuccessful,
  ])

  const submitAll = async () => {
    dispatch({ type: 'SUBMIT' })

    /**
     * We're executing these steps all in sequence, since certain forms can depend on other forms in
     * the backend.
     *
     * Todo: There might be a performance optimization by submitting multiple forms in parallel.
     */
    // eslint-disable-next-line no-await-in-loop
    for (const [, { submit }] of formsToSubmit) await submit()

    dispatch({ type: 'SUBMITTED' })
  }

  return (
    <Render
      formState={formState}
      buttonState={buttonState}
      submit={submitAll}
      error={mergeErrors(errors)}
    />
  )
}
