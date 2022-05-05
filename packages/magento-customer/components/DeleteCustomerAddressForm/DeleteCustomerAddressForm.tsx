import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@graphcommerce/lingui-next'
import { Button } from '@mui/material'
import { DeleteCustomerAddressFormDocument } from './DeleteCustomerAddressForm.gql'

export type DeleteCustomerAddressFormProps = {
  addressId?: number
}

export function DeleteCustomerAddressForm(props: DeleteCustomerAddressFormProps) {
  const { addressId } = props
  const { handleSubmit, error } = useFormGqlMutation(
    DeleteCustomerAddressFormDocument,
    { defaultValues: { id: addressId } },
    { errorPolicy: 'all' },
  )
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button type='submit' variant='text' color='primary'>
        <Trans>Delete this address</Trans>
      </Button>
      <ApolloErrorSnackbar error={error} />
    </form>
  )
}
