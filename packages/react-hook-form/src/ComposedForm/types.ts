import { ApolloError } from '@apollo/client'
import type { FieldValues, FormState, GlobalError, UseFormReturn } from 'react-hook-form'
import type { SetOptional } from 'type-fest'

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
export type ButtonState = {
  /** When the submit is called, isSubmit will be set to true */
  isSubmitting: boolean
  /** After the submission is done, isSubmitted is set to true */
  isSubmitted: boolean
  /** After the submission is successful, isSubmitSuccessful will be true */
  isSubmitSuccessful: boolean
}

export type ComposedSubmitRenderComponentProps = {
  submit: () => Promise<void>
  buttonState: ButtonState
  error?: ApolloError
}

export type ComposedFormState = {
  forms: {
    [step: number]: UseFormComposeOptions | SetOptional<UseFormComposeOptions, 'form' | 'submit'>
  }
  isCompleting: boolean
  buttonState: ButtonState
  formState: FormStateAll
  submitted: boolean
  error?: ApolloError
}

/** Register a new form with the useFormCompose hook */
export type RegisterAction = {
  type: 'REGISTER'
} & Pick<UseFormComposeOptions, 'key' | 'step'>

/** Assign the current state to the form */
export type AssignAction = { type: 'ASSIGN' } & Omit<UseFormComposeOptions, 'step'>

/** Cleanup the form if the useFromCompose hook changes */
export type UnregisterAction = {
  type: 'UNREGISTER'
} & Pick<UseFormComposeOptions, 'key'>
/** Recalculate the combined formstate */
export type FormStateAction = { type: 'FORMSTATE' }
/** Submit all forms and call onSubmitComplete?.() when done */
export type SubmitAction = { type: 'SUBMIT' }
export type SubmittingAction = { type: 'SUBMITTING' }
export type SubmittedAction = { type: 'SUBMITTED'; isSubmitSuccessful: boolean }

export type Actions =
  | AssignAction
  | RegisterAction
  | UnregisterAction
  | FormStateAction
  | SubmitAction
  | SubmittingAction
  | SubmittedAction

export type ComposedFormReducer = React.Reducer<ComposedFormState, Actions>

export type ComposedFormContext = [
  React.ReducerState<ComposedFormReducer>,
  React.Dispatch<React.ReducerAction<ComposedFormReducer>>,
]
