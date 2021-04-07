import { useQuery } from '@apollo/client'
import { useFormAutoSubmit, useFormGqlQuery } from '@reachdigital/react-hook-form'
import { useEffect, useState } from 'react'
import { CustomerTokenDocument } from '../CustomerToken.gql'
import { IsEmailAvailableDocument } from '../IsEmailAvailable.gql'

type useFormIsEmailAvailableProps = {
  email?: string | null
  onSubmitted?: (data: { email: string }) => void
}

export default function useFormIsEmailAvailable(props: useFormIsEmailAvailableProps) {
  const { email, onSubmitted } = props
  const { data: token } = useQuery(CustomerTokenDocument)

  const form = useFormGqlQuery(IsEmailAvailableDocument, {
    mode: 'onChange',
    defaultValues: { email: email ?? undefined },
  })
  const { formState, data, handleSubmit } = form

  const submit = handleSubmit(onSubmitted || (() => {}))
  const autoSubmitting = useFormAutoSubmit({ form, submit, forceInitialSubmit: true })
  const isManualSubmitting = formState.isSubmitting && !autoSubmitting
  const hasAccount = data?.isEmailAvailable?.is_email_available === false
  const { isDirty, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } = formState

  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const [mode, setMode] = useState<'email' | 'signin' | 'signup' | 'signedin'>(
    token?.customerToken && token?.customerToken.valid ? 'signedin' : 'email',
  )

  useEffect(() => {
    if (isLoggedIn) {
      setMode('signedin')
      return
    }
    if (isSubmitting) return
    if (!isValid) {
      setMode('email')
      return
    }
    if (!isDirty && isSubmitted && isSubmitSuccessful && isValid)
      setMode(hasAccount ? 'signin' : 'signup')
  }, [hasAccount, isDirty, isLoggedIn, isSubmitSuccessful, isSubmitted, isSubmitting, isValid])

  return { mode, form, token, submit, isManualSubmitting, autoSubmitting, hasAccount }
}
