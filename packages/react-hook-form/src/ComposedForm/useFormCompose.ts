import { useContext, useEffect } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { composedFormContext } from './context'
import { UseFormComposeOptions } from './types'

export function useFormCompose<V>(fields: UseFormComposeOptions<V>) {
  const [state, dispatch] = useContext(composedFormContext)
  const { form, key, step, submit } = fields

  const { formState } = form

  useEffect(() => {
    dispatch({ type: 'REGISTER', key, step })
    return () => dispatch({ type: 'UNREGISTER', key })
  }, [dispatch, key, step])

  useEffect(() => {
    dispatch({ type: 'ASSIGN', key, form: form as UseFormReturn<FieldValues>, submit })
  }, [dispatch, fields, form, key, submit])

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
