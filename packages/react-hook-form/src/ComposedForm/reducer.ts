import { isFormGqlOperation } from '../useFormGqlMutation'
import type { ComposedFormReducer, ComposedFormState } from './types'

function updateFormStateIfNecessary(state: ComposedFormState): ComposedFormState {
  const formEntries = Object.entries(state.forms)
  const formState = Object.entries(state.forms).map(
    ([, { form }]) =>
      form?.formState ?? {
        isSubmitting: false,
        isSubmitSuccessful: false,
        isSubmitted: false,
        isValid: false,
      },
  )
  const hasState = formState.length > 0

  const isSubmitting = hasState && formState.some((fs) => fs.isSubmitting)
  const isSubmitSuccessful =
    hasState &&
    formState.every((f) => f.isSubmitSuccessful) &&
    formEntries.every(([, f]) => (f.form && isFormGqlOperation(f.form) ? !f.form.error : true))
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
  // if (
  //   process.env.NODE_ENV !== 'production' &&
  //   action.type !== 'ASSIGN' &&
  //   action.type !== 'REGISTER'
  // ) {
  //   console.log(
  //     `[composedFormReducer] ${action.type}`,
  //     action,
  //     Object.fromEntries(
  //       Object.entries(state.forms).map(([k, v]) => {
  //         return [k, v.form?.formState]
  //       }),
  //     ),
  //   )
  // }

  switch (action.type) {
    case 'REGISTER':
      return { ...state, forms: { ...state.forms, [action.key]: undefined } }
      break
    case 'UNREGISTER':
      delete state.forms[action.key]
      return { ...state }
      break
    case 'ASSIGN':
      state.forms[action.key] = { ...state.forms[action.key], ...action }
      break
    case 'SUBMIT':
      return {
        ...state,
        buttonState: { ...state.buttonState, isSubmitting: true },
      }
    case 'SUBMITTING':
      return {
        ...state,
        isCompleting: true,
        buttonState: { ...state.buttonState },
      }
    case 'SUBMITTED':
      return {
        ...state,
        isCompleting: false,
        buttonState: {
          isSubmitting: false,
          isSubmitted: true,
          isSubmitSuccessful: action.isSubmitSuccessful,
        },
      }
    case 'FORMSTATE':
      return updateFormStateIfNecessary(state)
  }

  return state
}
