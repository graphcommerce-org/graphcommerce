import { useApolloClient, useMutation, useQuery } from '@graphcommerce/graphql'
import { useFormAutoSubmit, useFormGqlQuery } from '@graphcommerce/react-hook-form'
import { SignOutFormDocument } from '../components/SignOutForm/SignOutForm.gql'
import { CustomerDocument } from './Customer.gql'
import {
  IsEmailAvailableDocument,
  IsEmailAvailableQuery,
  IsEmailAvailableQueryVariables,
} from './IsEmailAvailable.gql'
import { useCustomerSession } from './useCustomerSession'

export type UseFormIsEmailAvailableProps = {
  onSubmitted?: (data: { email: string }) => void
}

export type AccountSignInUpState = 'email' | 'signin' | 'signup' | 'signedin' | 'session-expired'

export const isToggleMethod = !import.meta.graphCommerce.enableGuestCheckoutLogin

export function useFormIsEmailAvailable(props: UseFormIsEmailAvailableProps = {}) {
  const { onSubmitted } = props
  const { token, valid } = useCustomerSession()

  const customerQuery = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })
  const cachedEmail = customerQuery?.data?.customer?.email

  const form = useFormGqlQuery<
    IsEmailAvailableQuery,
    IsEmailAvailableQueryVariables & { requestedMode?: 'signin' | 'signup' }
  >(
    IsEmailAvailableDocument,
    {
      experimental_useV2: true,
      mode: 'onChange',
      values: { email: cachedEmail ?? '' },
      defaultValues: { requestedMode: 'signin' },
    },
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

  const { isSubmitSuccessful, isValid } = formState

  const hasAccount = data?.isEmailAvailable?.is_email_available === false

  let mode: AccountSignInUpState
  if (token && valid) mode = 'signedin'
  else if (token && !valid) mode = 'session-expired'
  else if (isToggleMethod) {
    mode = form.watch('requestedMode') ?? 'signin'
  } else {
    // 1. Nothing is entered
    mode = 'email'

    if (isValid && isSubmitSuccessful) mode = hasAccount ? 'signin' : 'signup'
  }

  return { mode, form, submit, autoSubmitting, hasAccount }
}
