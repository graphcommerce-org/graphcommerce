import { ApolloError } from '@apollo/client'
import { FieldValues, FormState, UseFormReturn } from 'react-hook-form'

export type UseFormComposeOptions<V extends FieldValues = FieldValues> = {
  /** The form that is used to submit */
  form: UseFormReturn<V>
  /** Method to submit the form */
  submit: ReturnType<UseFormReturn<V>['handleSubmit']>

  /** Identifier of the specific */
  key: string
  /**
   * To submit multiple forms we need to define a sequence how the forms are structured so they can
   * be submitted in that sequence.
   *
   * One form might depend on another form, so we first submit the first form, then the second, etc.
   */
  step: number
}

export type FormStateAll = Pick<
  FormState<FieldValues>,
  'isSubmitting' | 'isSubmitted' | 'isSubmitSuccessful' | 'isValid'
>
export type ButtonState = Pick<
  FormState<FieldValues>,
  'isSubmitting' | 'isSubmitted' | 'isSubmitSuccessful'
>

export type ComposedSubmitRenderComponentProps = {
  submit: () => Promise<void>
  buttonState: ButtonState
  formState: FormStateAll
  error?: ApolloError
}

export type ComposedFormState = {
  forms: { [step: number]: UseFormComposeOptions<FieldValues> }
  buttonState: ButtonState
  formState: FormStateAll
  submitted: boolean
  error?: ApolloError
}

/** Register a new form with the useFormCompose hook */
export type RegisterAction = { type: 'REGISTER' } & UseFormComposeOptions
/** Cleanup the form if the useFromCompose hook changes */
export type UnregisterAction = { type: 'UNREGISTER'; key: UseFormComposeOptions['key'] }
/** Recalculate the combined formstate */
export type FormStateAction = { type: 'FORMSTATE' }
/** Submit all forms and call onSubmitComplete?.() when done */
export type SubmitAction = { type: 'SUBMIT' }
export type SubmittedAction = { type: 'SUBMITTED' }
export type FinishSubmissionAction = { type: 'FINISH'; isSubmitSuccessful: boolean }

export type Actions =
  | RegisterAction
  | UnregisterAction
  | FormStateAction
  | SubmitAction
  | SubmittedAction
  | FinishSubmissionAction

export type ComposedFormReducer = React.Reducer<ComposedFormState, Actions>

export type ComposedFormContext = [
  React.ReducerState<ComposedFormReducer>,
  React.Dispatch<React.ReducerAction<ComposedFormReducer>>,
]
