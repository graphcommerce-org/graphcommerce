import { FormControl } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { useRouter } from 'next/router'
import React from 'react'
import { SignOutDocument } from './SignOut.gql'

type SignOutFormProps = Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function SignOutForm(props: SignOutFormProps) {
  const router = useRouter()
  const { handleSubmit, formState, error } = useFormGqlMutation(SignOutDocument, {
    onComplete: () => router.back(),
  })
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate {...props}>
      <FormControl>
        <Button type='submit' loading={formState.isSubmitting} color='primary'>
          Sign out
        </Button>
      </FormControl>
      <ApolloErrorAlert error={error} />
    </form>
  )
}
