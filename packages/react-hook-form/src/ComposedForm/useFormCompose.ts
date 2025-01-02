import { useContext, useEffect } from 'react'
import type { FieldValues } from 'react-hook-form'
import { isFormGqlOperation } from '../useFormGqlMutation'
import { composedFormContext } from './context'
import type { UseFormComposeOptions } from './types'

export function useFormCompose<TFieldValues extends FieldValues = FieldValues>(
  fields: UseFormComposeOptions<TFieldValues>,
) {
  const [state, dispatch] = useContext(composedFormContext)
  const { form, key, step, submit } = fields

  const { formState } = form

  useEffect(() => {
    dispatch({ type: 'REGISTER', key, step })
    return () => dispatch({ type: 'UNREGISTER', key })
  }, [dispatch, key, step])

  useEffect(() => {
    dispatch({ type: 'ASSIGN', key, form, submit })
  }, [dispatch, fields, form, key, submit])

  const error = isFormGqlOperation(form) ? form.error : undefined

  useEffect(() => {
    dispatch({ type: 'FORMSTATE' })
  }, [
    dispatch,
    formState.isSubmitSuccessful,
    formState.isSubmitted,
    formState.isSubmitting,
    formState.isValid,
    error,
  ])

  return state.formState
}
