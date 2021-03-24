import { useQuery } from '@apollo/client'
import useFormAutoSubmit from '@reachdigital/react-hook-form/useFormAutoSubmit'
import useFormGqlQuery from '@reachdigital/react-hook-form/useFormGqlQuery'
import { useEffect, useState } from 'react'
import { CustomerTokenDocument } from '../CustomerToken.gql'
import { IsEmailAvailableDocument } from '../IsEmailAvailable.gql'

type useFormIsEmailAvailableProps = {
  email?: string | null
  onSubmitted?: (data: { email: string }) => void
}

export default function useFormIsEmailAvailable(props: useFormIsEmailAvailableProps) {
  const { email, onSubmitted } = props
  const [mode, setMode] = useState<'email' | 'signin' | 'signup' | 'signedin'>('email')

  const { data: token } = useQuery(CustomerTokenDocument)

  const form = useFormGqlQuery(IsEmailAvailableDocument, {
    mode: 'onChange',
    defaultValues: { email: email ?? undefined },
  })

  const { formState, data, handleSubmit } = form

  const submit = handleSubmit(onSubmitted || (() => {}))
  const autoSubmitting = useFormAutoSubmit({ form, submit })
  const isManualSubmitting = formState.isSubmitting && !autoSubmitting
  const hasAccount = data?.isEmailAvailable?.is_email_available === false

  useEffect(() => {
    if (formState.isSubmitting) return
    if (formState.isSubmitted && formState.isSubmitSuccessful && formState.isValid && hasAccount)
      setMode('signin')
    if (formState.isSubmitted && formState.isSubmitSuccessful && formState.isValid && !hasAccount)
      setMode('signup')
    if (token?.customerToken && token?.customerToken.valid) setMode('signedin')
  }, [
    formState.isSubmitSuccessful,
    formState.isSubmitted,
    formState.isSubmitting,
    formState.isValid,
    hasAccount,
    token?.customerToken,
  ])

  return { mode, form, token, submit, isManualSubmitting, autoSubmitting, hasAccount }
}
