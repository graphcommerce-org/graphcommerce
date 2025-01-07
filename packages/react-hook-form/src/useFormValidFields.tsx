import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import type { IsRequired } from './useGqlDocumentHandler'

export type UseFormValidReturn<TFieldValues extends FieldValues> = Partial<
  Record<FieldPath<TFieldValues>, boolean>
>

/**
 * ### useFormValidFields
 *
 * Record field names as key and boolean as value indicating whether the field is valid
 *
 * @deprecated Please use TextInputElement, SelectElement, etc. with the showValid prop
 * @public
 */
export function useFormValidFields<TFieldValues extends FieldValues>(
  form: Pick<UseFormReturn<TFieldValues>, 'watch' | 'formState'>,
  required: IsRequired<TFieldValues>,
): UseFormValidReturn<TFieldValues> {
  const { watch, formState } = form
  const fields: Partial<Record<FieldPath<TFieldValues>, boolean>> = {}

  Object.keys(required).forEach((key) => {
    fields[key] = !formState.errors[key] && watch(key as FieldPath<TFieldValues>)
  })

  return fields
}
