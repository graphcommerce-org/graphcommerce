import { isFormGqlOperation } from '../useFormGqlMutation'
import { ComposedFormState, CombinedFormState } from './types'

export function combineFormState(forms: ComposedFormState['forms']): CombinedFormState {
  const formEntries = Object.entries(forms)
  const formState = Object.entries(forms).map(([, { form }]) => form.formState)
  const hasState = formState.length > 0

  return {
    isSubmitting: hasState && formState.some(({ isSubmitting }) => isSubmitting),
    isSubmitSuccessful:
      hasState &&
      formState.every((f) => f.isSubmitSuccessful) &&
      formEntries.every(([, f]) => (isFormGqlOperation(f.form) ? !f.form.error : true)),
    isSubmitted: hasState && formState.every(({ isSubmitted }) => isSubmitted),
    isValid: hasState && formState.every(({ isValid }) => isValid),
  }
}
