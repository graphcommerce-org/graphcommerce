import { useFormAutoSubmit, useFormGqlQuery } from '@graphcommerce/react-hook-form'
import { useEffect, useState } from 'react'
import { CustomerDocument } from './Customer.gql'
import {
  IsEmailAvailableDocument,
  IsEmailAvailableQuery,
  IsEmailAvailableQueryVariables,
} from './IsEmailAvailable.gql'
import { useCustomerQuery } from './useCustomerQuery'
import { useCustomerSession } from './useCustomerSession'

export type UseFormIsEmailAvailableProps = {
  email?: string | null
  onSubmitted?: (data: { email: string }) => void
}

export type AccountSignInUpState = 'email' | 'signin' | 'signup' | 'signedin' | 'session-expired'

export const isToggleMethod = import.meta.graphCommerce.loginMethod === 'TOGGLE'

export function useFormIsEmailAvailable(props: UseFormIsEmailAvailableProps) {
  const { email, onSubmitted } = props
  const { loggedIn, requireAuth } = useCustomerSession()
  const customerQuery = useCustomerQuery(CustomerDocument)

  const form = useFormGqlQuery<
    IsEmailAvailableQuery,
    IsEmailAvailableQueryVariables & { requestedMode?: 'signin' | 'signup' }
  >(
    IsEmailAvailableDocument,
    { mode: 'onChange', defaultValues: { email: email ?? '' } },
    { fetchPolicy: 'cache-and-network' },
  )
  const { formState, data, handleSubmit } = form

  const submit = isToggleMethod ? () => Promise.resolve() : handleSubmit(onSubmitted || (() => {}))
  const autoSubmitting = useFormAutoSubmit({
    form,
    submit,
    forceInitialSubmit: true,
    disabled: isToggleMethod,
  })

  const hasAccount = data?.isEmailAvailable?.is_email_available === false
  const modeFromIsEmailAvailable = hasAccount ? 'signin' : 'signup'
  const modeFromToggle = form.watch('requestedMode') ?? 'signin'
  const requestedMode = isToggleMethod ? modeFromToggle : modeFromIsEmailAvailable

  const { isDirty, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } = formState

  const [mode, setMode] = useState<AccountSignInUpState>(loggedIn ? 'signedin' : 'email')

  useEffect(() => {
    if (loggedIn) {
      setMode('signedin')
      return
    }
    if (isSubmitting) return
    if (!isValid) return
    if (!isDirty && isSubmitted && isSubmitSuccessful && isValid) setMode(requestedMode)

    if (customerQuery.data?.customer && requireAuth)
      setMode(isSubmitSuccessful ? 'signin' : 'session-expired')
  }, [
    customerQuery.data?.customer,
    requestedMode,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    isValid,
    loggedIn,
    requireAuth,
  ])

  return { mode, form, submit, autoSubmitting, hasAccount }
}
