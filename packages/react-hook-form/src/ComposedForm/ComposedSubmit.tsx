import { ApolloError } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { FormState, FieldValues } from 'react-hook-form'
import { isFormGqlOperation } from '../useFormGqlMutation'
import { composedFormContext } from './context'
import { ComposedFormContext } from './types'

type Fields = 'isSubmitting' | 'isSubmitted' | 'isSubmitSuccessful' | 'isValid'

type CombinedFormState = Pick<FormState<FieldValues>, Fields>
function extractFormState(forms: ComposedFormContext): CombinedFormState {
  const formState = Object.entries(forms).map(([, { form }]) => form.formState)
  const hasState = formState.length > 0

  return {
    isSubmitting: hasState && formState.some(({ isSubmitting }) => isSubmitting),
    isSubmitSuccessful: hasState && formState.every(({ isSubmitSuccessful }) => isSubmitSuccessful),
    isSubmitted: hasState && formState.every(({ isSubmitted }) => isSubmitted),
    isValid: hasState && formState.every(({ isValid }) => isValid),
  }
}

export type ComposedSubmitRenderComponentProps = {
  submit: () => Promise<CombinedFormState['isSubmitSuccessful']>
  formState: CombinedFormState
  error?: ApolloError
}

export type ComposedSubmitProps = {
  onSuccess?: () => void
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
  const { render: Render } = props
  const forms = useContext(composedFormContext)
  const [formState, setFormState] = useState(extractFormState(forms))
  const formEntries = Object.entries(forms)

  const submitAll = async () => {
    setFormState({ ...extractFormState(forms), isSubmitting: true })

    /**
     * We're executing these steps all in sequence, but there might be a performance optimization to
     * submit multiple forms at once.
     */
    for (const [, { submit }] of formEntries) {
      // eslint-disable-next-line no-await-in-loop
      await submit()
    }

    const formS = extractFormState(forms)
    setFormState(formS)

    return formS.isSubmitSuccessful
  }

  const errors: ApolloError[] = []
  formEntries.forEach(([, { form }]) => {
    if (isFormGqlOperation(form) && form.error) errors.push(form.error)
  })

  return (
    <Render
      formState={{
        ...formState,
        isSubmitSuccessful: !errors.length && formState.isSubmitSuccessful,
      }}
      submit={submitAll}
      error={mergeErrors(errors)}
    />
  )
}
