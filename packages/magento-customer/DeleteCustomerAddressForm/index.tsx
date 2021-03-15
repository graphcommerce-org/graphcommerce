import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { FormState } from '@reachdigital/react-hook-form/useForm'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { useRouter } from 'next/router'
import React from 'react'
import { DeleteCustomerAddressFormDocument } from './DeleteCustomerAddressForm.gql'

export type DeleteCustomerAddressFormProps = {
  addressId?: number
  button: (props: { formState: FormState<unknown> }) => React.ReactNode
}

export default function DeleteCustomerAddressForm(props: DeleteCustomerAddressFormProps) {
  const { addressId, button } = props
  const router = useRouter()
  const { handleSubmit, formState, error } = useFormGqlMutation(DeleteCustomerAddressFormDocument, {
    defaultValues: {
      id: addressId,
    },
    onComplete: () => {
      router.push('/account/addresses')
    },
  })
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      {button({ formState })}
      <ApolloErrorAlert error={error} />
    </form>
  )

  return <>delete customer address</>
}
