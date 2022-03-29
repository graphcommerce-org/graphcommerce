import { FormState, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignOutFormDocument } from './SignOutForm.gql'
import { useApolloClient } from '@graphcommerce/graphql'

type SignOutFormProps = { button: (props: { formState: FormState<unknown> }) => React.ReactNode }

export function SignOutForm(props: SignOutFormProps) {
  const { button } = props
  const router = useRouter()
  const client = useApolloClient()

  const { handleSubmit, formState, error } = useFormGqlMutation(
    SignOutFormDocument,
    {
      onComplete: () => {
        client.clearStore()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/')
      },
    },
    { errorPolicy: 'all' },
  )
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      {button({ formState })}
      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}
