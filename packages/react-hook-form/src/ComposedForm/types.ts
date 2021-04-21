import { FieldValues, UseFormReturn } from 'react-hook-form'

export type UseFormComposeOptions<V> = {
  form: UseFormReturn<V>
  submit: ReturnType<UseFormReturn<V>['handleSubmit']>
  name: string
}
export type ComposedFormContext = { [name: string]: UseFormComposeOptions<FieldValues> }
