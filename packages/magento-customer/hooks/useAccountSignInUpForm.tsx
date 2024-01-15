import { useQuery } from '@graphcommerce/graphql'
import { useFormGqlQuery } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CustomerDocument } from './Customer.gql'
import {
  IsEmailAvailableDocument,
  IsEmailAvailableQuery,
  IsEmailAvailableQueryVariables,
} from './IsEmailAvailable.gql'
import { useCustomerSession } from './useCustomerSession'
import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { useShowBack } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderBack'

export type UseFormIsEmailAvailableProps = {
  onSubmitted?: (data: { email: string }) => void
}

export type AccountSignInUpState = 'email' | 'signin' | 'signup' | 'signedin' | 'session-expired'

export const isToggleMethod = !import.meta.graphCommerce.enableGuestCheckoutLogin

export function useAccountSignInUpForm(props: UseFormIsEmailAvailableProps = {}) {
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
      mode: 'onBlur',
      values: { email: cachedEmail ?? '' },
      defaultValues: { requestedMode: 'signin' },
    },
    { fetchPolicy: 'cache-and-network' },
  )
  const { formState, data, handleSubmit } = form
  const { isSubmitSuccessful, isValid } = formState

  const router = useRouter()
  useEffect(() => {
    const emailFromParams = router.query.email as string

    if (!cachedEmail && emailFromParams) {
      form.setValue('email', emailFromParams)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      form.trigger('email')
    }
  }, [cachedEmail, router.query.email, form])

  const submit = isToggleMethod
    ? async (e?: React.BaseSyntheticEvent) => {
        e?.preventDefault()
        await form.trigger('email')
      }
    : handleSubmit(onSubmitted || (() => {}))

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

  const { closeSteps = 0 } = usePageContext() ?? {}
  useEffect(() => {
    // Automatically close the overlay if the user is signed in
    if (mode === 'signedin' && closeSteps > 0) window.history.go(closeSteps * -1)
  }, [mode, closeSteps])

  return { mode, form, submit }
}
