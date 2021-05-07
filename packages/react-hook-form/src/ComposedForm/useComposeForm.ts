import { useContext, useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { composedFormContext } from './context'
import { UseFormComposeOptions } from './types'

export function useFormCompose<V extends FieldValues = FieldValues>(
  fields: UseFormComposeOptions<V>,
) {
  const context = useContext(composedFormContext)

  useEffect(() => {
    console.log('register', fields)
    return () => {
      console.log('unregister', fields)
    }
  }, [])

  context[fields.step] = fields as UseFormComposeOptions<FieldValues>
}
