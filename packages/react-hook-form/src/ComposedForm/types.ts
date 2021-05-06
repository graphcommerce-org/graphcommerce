import { FieldValues, UseFormReturn } from 'react-hook-form'

export type UseFormComposeOptions<V extends FieldValues = FieldValues> = {
  /** The form that is used to submit */
  form: UseFormReturn<V>
  submit: ReturnType<UseFormReturn<V>['handleSubmit']>
  /**
   * To submit multiple forms we need to define a sequence how the forms are structured so they can
   * be submitted in that sequence.
   *
   * One form might depend on another form, so we first submit the first form, then the second, etc.
   */
  step: number
}
export type ComposedFormContext = { [step: number]: UseFormComposeOptions<FieldValues> }
