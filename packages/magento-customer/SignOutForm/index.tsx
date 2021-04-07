import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { FormState, useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { SignOutFormDocument } from './SignOutForm.gql'

type SignOutFormProps = { button: (props: { formState: FormState<unknown> }) => React.ReactNode }

export default function SignOutForm(props: SignOutFormProps) {
  const { button } = props
  const router = useRouter()
  const { handleSubmit, formState, error } = useFormGqlMutation(SignOutFormDocument, {
    onComplete: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/')
    },
  })
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      {button({ formState })}
      <ApolloErrorAlert error={error} />
    </form>
  )
}
