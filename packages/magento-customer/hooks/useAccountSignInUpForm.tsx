import { usePageContext } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { useUrlQuery } from '@graphcommerce/next-ui'
import { useFormGqlQuery } from '@graphcommerce/react-hook-form'
import { useEffect } from 'react'
import { CustomerDocument } from './Customer.gql'
import {
  IsEmailAvailableDocument,
  IsEmailAvailableQuery,
  IsEmailAvailableQueryVariables,
} from './IsEmailAvailable.gql'
import { useCustomerAccountCanSignUp } from './useCustomerPermissions'
import { useCustomerSession } from './useCustomerSession'

export type UseFormIsEmailAvailableProps = {
  onSubmitted?: (data: { email: string }) => void
}

export type AccountSignInUpState = 'email' | 'signin' | 'signup' | 'signedin' | 'session-expired'

export function useAccountSignInUpForm(props: UseFormIsEmailAvailableProps = {}) {
  const { onSubmitted } = props
  const { token, valid } = useCustomerSession()

  const canSignUp = useCustomerAccountCanSignUp()
  const isToggleMethod = !import.meta.graphCommerce.enableGuestCheckoutLogin || !canSignUp

  const [queryState, setRouterQuery] = useUrlQuery<{ email?: string | null }>()

  const customerQuery = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })
  const cachedEmail = customerQuery?.data?.customer?.email

  const form = useFormGqlQuery<
    IsEmailAvailableQuery,
    IsEmailAvailableQueryVariables & { requestedMode?: 'signin' | 'signup' }
  >(
    IsEmailAvailableDocument,
    {
      mode: 'onBlur',
      values: { email: cachedEmail ?? '' },
      defaultValues: { requestedMode: 'signin' },
    },
    { fetchPolicy: 'cache-and-network' },
  )
  const { formState, data, handleSubmit, setValue, trigger } = form
  const { isSubmitSuccessful, isValid } = formState

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!cachedEmail && queryState.email) {
        await setRouterQuery({ email: null })

        setValue('email', queryState.email)
        await trigger('email')
      }
    })()
  }, [cachedEmail, queryState.email, setRouterQuery, setValue, trigger])

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
