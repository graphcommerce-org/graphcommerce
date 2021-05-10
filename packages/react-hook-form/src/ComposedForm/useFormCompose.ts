import { useContext, useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { composedFormContext } from './context'
import { UseFormComposeOptions } from './types'

export function useFormCompose<V extends FieldValues = FieldValues>(
  fields: UseFormComposeOptions<V>,
) {
  const [state, dispatch] = useContext(composedFormContext)

  const { form } = fields
  const { formState } = form

  useEffect(() => {
    dispatch({ type: 'REGISTER', ...(fields as UseFormComposeOptions<FieldValues>) })
    return () => dispatch({ type: 'UNREGISTER', key: fields.key })
  }, [dispatch, fields])

  useEffect(() => {
    dispatch({ type: 'FORMSTATE' })
  }, [
    dispatch,
    formState.isSubmitSuccessful,
    formState.isSubmitted,
    formState.isSubmitting,
    formState.isValid,
  ])

  return state.formState
}
