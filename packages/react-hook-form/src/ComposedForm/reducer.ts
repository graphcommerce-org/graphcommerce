import { isFormGqlOperation } from '../useFormGqlMutation'
import { ComposedFormReducer, ComposedFormState } from './types'

function updateFormStateIfNecessary(state: ComposedFormState): ComposedFormState {
  const formEntries = Object.entries(state.forms)
  const formState = Object.entries(state.forms).map(([, { form }]) => form.formState)
  const hasState = formState.length > 0

  const isSubmitting = hasState && formState.some((fs) => fs.isSubmitting)
  const isSubmitSuccessful =
    hasState &&
    formState.every((f) => f.isSubmitSuccessful) &&
    formEntries.every(([, f]) => (isFormGqlOperation(f.form) ? !f.form.error : true))
  const isSubmitted = hasState && formState.every((fs) => fs.isSubmitted)
  const isValid = hasState ? formState.every((fs) => fs.isValid) : false

  if (
    state.formState.isSubmitSuccessful !== isSubmitSuccessful ||
    state.formState.isSubmitted !== isSubmitted ||
    state.formState.isSubmitting !== isSubmitting ||
    state.formState.isValid !== isValid
  ) {
    return {
      ...state,
      formState: { isSubmitting, isSubmitSuccessful, isSubmitted, isValid },
    }
  }

  return state
}

export const composedFormReducer: ComposedFormReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      state.forms[action.key] = action
      break
    case 'UNREGISTER':
      delete state.forms[action.key]
      break
    case 'FORMSTATE':
      return updateFormStateIfNecessary(state)
  }

  return state
}
