import { useApolloClient } from '@graphcommerce/graphql'
import { FormState, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignOutFormDocument } from './SignOutForm.gql'
import { signOut } from './signOut'

type SignOutFormProps = {
  button: (props: { formState: FormState<Record<string, unknown>> }) => React.ReactNode
}

export function SignOutForm(props: SignOutFormProps) {
  const { button: Button } = props
  const router = useRouter()
  const client = useApolloClient()

  const { handleSubmit, formState, error } = useFormGqlMutation(
    SignOutFormDocument,
    {
      onComplete: async () => {
        signOut(client)
        await router.push('/')
      },
    },
    { errorPolicy: 'all' },
  )
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button formState={formState} />
      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}
