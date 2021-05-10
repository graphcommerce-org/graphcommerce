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

type Fields = 'isSubmitting' | 'isSubmitted' | 'isSubmitSuccessful' | 'isValid'

export type FormStateComposed = Pick<FormState<FieldValues>, Fields>

export type ComposedSubmitRenderComponentProps = {
  submit: () => Promise<void>
  formState: FormStateComposed
  error?: ApolloError
}

export type ComposedFormState = {
  forms: { [step: number]: UseFormComposeOptions<FieldValues> }
  formState: FormStateComposed
  error?: ApolloError
}

export type RegisterForm = { type: 'REGISTER' } & UseFormComposeOptions
export type UnregisterForm = { type: 'UNREGISTER'; key: UseFormComposeOptions['key'] }
export type UpdateFormState = { type: 'FORMSTATE' }

export type Actions = RegisterForm | UnregisterForm | UpdateFormState

export type ComposedFormReducer = React.Reducer<ComposedFormState, Actions>

export type ComposedFormContext = [
  React.ReducerState<ComposedFormReducer>,
  React.Dispatch<React.ReducerAction<ComposedFormReducer>>,
]
