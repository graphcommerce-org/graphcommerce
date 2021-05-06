import React, { useContext, useEffect, useState } from 'react'
import { FormState, FieldValues } from 'react-hook-form'
import { composedFormContext } from './context'
import { ComposedFormContext } from './types'

type Fields = 'isSubmitting' | 'isSubmitted' | 'isSubmitSuccessful' | 'isValid'

type CombinedFormState = Pick<FormState<FieldValues>, Fields>
function extractFormState(forms: ComposedFormContext): CombinedFormState {
  const formState = Object.entries(forms).map(([, { form }]) => form.formState)

  return {
    isSubmitting: formState.some(({ isSubmitting }) => isSubmitting),
    isSubmitSuccessful: formState.every(({ isSubmitSuccessful }) => isSubmitSuccessful),
    isSubmitted: formState.every(({ isSubmitted }) => isSubmitted),
    isValid: formState.every(({ isValid }) => isValid),
  }
}

export type ComposedSubmitRenderComponentProps = {
  submit: () => Promise<CombinedFormState['isSubmitSuccessful']>
  formState: CombinedFormState
}

export type ComposedSubmitProps = {
  onSuccess?: () => void
  RenderComponent: React.FC<ComposedSubmitRenderComponentProps>
}

export default function ComposedSubmit(props: ComposedSubmitProps) {
  const { RenderComponent: Render } = props
  const forms = useContext(composedFormContext)
  const [formState, setFormState] = useState(extractFormState(forms))

  const submitAll = async () => {
    let formS = extractFormState(forms)
    setFormState({ ...formS, isSubmitting: true })

    for (const [, { form, submit }] of Object.entries(forms)) {
      // eslint-disable-next-line no-await-in-loop
      await submit()
    }

    formS = extractFormState(forms)
    setFormState(formS)

    return formS.isSubmitSuccessful
  }
  return <Render formState={formState} submit={submitAll} />
}
