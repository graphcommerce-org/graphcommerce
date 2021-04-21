import React, { useContext, useState } from 'react'
import { FormState, FieldValues } from 'react-hook-form'
import { composedFormContext } from './context'
import { ComposedFormContext } from './types'

type Fields = 'isSubmitting' | 'isSubmitted' | 'isSubmitSuccessful' | 'isValid'
const fields: Fields[] = ['isSubmitting', 'isSubmitted', 'isSubmitSuccessful', 'isValid']

type CombinedFormState = Pick<FormState<FieldValues>, Fields>
function extractFormState(forms: ComposedFormContext): CombinedFormState {
  const entries = Object.entries(forms)

  return Object.fromEntries(
    fields.map((field: keyof CombinedFormState) => [
      field,
      entries.some(([, { form }]) => form.formState[field]),
    ]),
  ) as CombinedFormState
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
    const state = extractFormState(forms)
    const promises = Object.entries(forms).map(
      ([, opts]) => opts.form.formState.isDirty && opts.submit(),
    )
    if (promises.every(Boolean)) return state.isSubmitSuccessful

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setFormState({ ...state, isSubmitting: true })
    await Promise.allSettled(promises)
    const newState = extractFormState(forms)
    setFormState(newState)
    return newState.isSubmitSuccessful
  }
  return <Render formState={formState} submit={submit} />
}
