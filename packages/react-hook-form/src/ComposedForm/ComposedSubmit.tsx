import { ApolloError } from '@graphcommerce/graphql'
import React, { useContext, useEffect } from 'react'
import { isFormGqlOperation } from '../useFormGqlMutation'
import { composedFormContext } from './context'
import { ComposedSubmitRenderComponentProps } from './types'

export type ComposedSubmitProps = {
  onSubmitSuccessful?: () => void
  render(props: ComposedSubmitRenderComponentProps): React.ReactNode
}

export function mergeErrors(errors: ApolloError[]): ApolloError | undefined {
  if (!errors.length) return undefined
  return new ApolloError({
    errorMessage: 'Composed submit error',
    networkError: errors.find((error) => error.networkError)?.networkError,
    graphQLErrors: errors.map((error) => error.graphQLErrors ?? []).flat(1),
  })
}

export default function ComposedSubmit(props: ComposedSubmitProps) {
  const { render: Render, onSubmitSuccessful } = props
  const [formContext, dispatch] = useContext(composedFormContext)
  const { formState, buttonState, isCompleting, forms } = formContext

  const formEntries = Object.entries(forms).sort((a, b) => a[1].step - b[1].step)

  useEffect(() => {
    if (isCompleting && !formState.isSubmitting) {
      /**
       * If we have forms that are invalid, we don't need to submit anything yet. We can trigger the
       * submission of the invalid forms and highlight those forms.
       */
      const isSubmitSuccessful = !formEntries.some(
        ([, f]) => Object.keys(f.form?.formState.errors ?? {}).length > 0,
      )

      dispatch({ type: 'SUBMITTED', isSubmitSuccessful })
      if (isSubmitSuccessful) onSubmitSuccessful?.()
    }
  }, [isCompleting, dispatch, formEntries, formState.isSubmitting, onSubmitSuccessful])

  /** Callback to submit all forms */
  const submitAll = async () => {
    /**
     * If we have forms that are have errors, we don't need to actually submit anything yet. We can
     * trigger the submission of the invalid forms and highlight the errors in those forms.
     */
    let formsToSubmit = formEntries.filter(
      ([, f]) => Object.keys(f.form?.formState.errors ?? {}).length > 0,
    )

    // We have no errors and no invalid forms, this means we can submit everything.
    if (!formsToSubmit.length) formsToSubmit = formEntries

    dispatch({ type: 'SUBMIT' })

    try {
      /**
       * We're executing these steps all in sequence, since certain forms can depend on other forms
       * in the backend.
       *
       * Todo: There might be a performance optimization by submitting multiple forms in parallel.
       */
      let canSubmit = true
      for (const [, { submit, form, key }] of formsToSubmit) {
        // eslint-disable-next-line no-await-in-loop
        if (canSubmit) await submit?.()
        // eslint-disable-next-line no-await-in-loop
        if (!canSubmit) await form?.trigger()
        if (form && isFormGqlOperation(form) && form.error) {
          // console.log(
          //   key,
          //   form?.formState.isValid,
          //   form && (isFormGqlOperation(form) ? form.error : undefined),
          // )
          canSubmit = false
        }
      }
      dispatch({ type: 'SUBMITTING' })
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
