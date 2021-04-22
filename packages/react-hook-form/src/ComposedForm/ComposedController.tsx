import React, { useContext, useState } from 'react'
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

  const submit = async () => {
    const promises = Object.entries(forms).map(([, opts]) => opts.submit())

    let formS = extractFormState(forms)
    if (promises.every(Boolean)) return formS.isSubmitSuccessful

    setFormState({ ...formS, isSubmitting: true })
    await Promise.allSettled(promises)

    formS = extractFormState(forms)
    setFormState(formS)
    return formS.isSubmitSuccessful
  }
  return <Render formState={formState} submit={submit} />
}
