import { useContext } from 'react'
import { FieldValues } from 'react-hook-form'
import { composedFormContext } from './context'
import { UseFormComposeOptions } from './types'

export function useFormCompose<V extends FieldValues = FieldValues>(
  fields: UseFormComposeOptions<V>,
) {
  const context = useContext(composedFormContext)
  context[fields.name] = fields as UseFormComposeOptions<FieldValues>
}
