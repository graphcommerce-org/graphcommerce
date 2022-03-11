import { useQuery } from '@graphcommerce/graphql'
import { useFormAutoSubmit, useFormGqlQuery, useFormPersist } from '@graphcommerce/react-hook-form'
import { useEffect, useState } from 'react'
import { CustomerDocument } from './Customer.gql'
import { CustomerTokenDocument } from './CustomerToken.gql'
import { IsEmailAvailableDocument } from './IsEmailAvailable.gql'

export type UseFormIsEmailAvailableProps = {
  email?: string | null
  onSubmitted?: (data: { email: string }) => void
}

export function useFormIsEmailAvailable(props: UseFormIsEmailAvailableProps) {
  const { email, onSubmitted } = props
  const { data: token } = useQuery(CustomerTokenDocument)
  const customerQuery = useQuery(CustomerDocument, {
    ssr: false,
    skip: typeof token === 'undefined',
  })

  const form = useFormGqlQuery(IsEmailAvailableDocument, {
    mode: 'onChange',
    defaultValues: { email: email ?? '' },
  })
  const { formState, data, handleSubmit } = form

  const submit = handleSubmit(onSubmitted || (() => {}))
  const autoSubmitting = useFormAutoSubmit({ form, submit })

  const hasAccount = data?.isEmailAvailable?.is_email_available === false
  const { isDirty, isSubmitSuccessful, isSubmitted, isSubmitting, isValid } = formState

  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const [mode, setMode] = useState<'email' | 'signin' | 'signup' | 'signedin' | 'session-expired'>(
    token?.customerToken && token?.customerToken.valid ? 'signedin' : 'email',
  )

  useFormPersist({ form, name: 'IsEmailAvailable' })

  useEffect(() => {
    if (isLoggedIn) {
      setMode('signedin')
      return
    }
    if (isSubmitting) return
    if (!isValid) return
    if (!isDirty && isSubmitted && isSubmitSuccessful && isValid)
      setMode(hasAccount ? 'signin' : 'signup')

    if (customerQuery.data?.customer && token && token.customerToken && !token.customerToken.valid)
      setMode(isSubmitSuccessful ? 'signin' : 'session-expired')
  }, [
    customerQuery.data?.customer,
    hasAccount,
    isDirty,
    isLoggedIn,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    isValid,
    token,
  ])

  return { mode, form, token, submit, autoSubmitting, hasAccount }
}
