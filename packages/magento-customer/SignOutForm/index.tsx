import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { FormState } from '@reachdigital/react-hook-form/useForm'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { useRouter } from 'next/router'
import React from 'react'
import { SignOutFormDocument } from './SignOutForm.gql'

type SignOutFormProps = { button: (props: { formState: FormState<unknown> }) => React.ReactNode }

export default function SignOutForm(props: SignOutFormProps) {
  const { button } = props
  const router = useRouter()
  const { handleSubmit, formState, error } = useFormGqlMutation(SignOutFormDocument, {
    onComplete: () => {
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
