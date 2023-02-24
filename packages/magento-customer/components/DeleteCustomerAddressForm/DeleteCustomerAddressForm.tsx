import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { DeleteCustomerAddressFormDocument } from './DeleteCustomerAddressForm.gql'

export type DeleteCustomerAddressFormProps = {
  addressId?: number
}

export function DeleteCustomerAddressForm(props: DeleteCustomerAddressFormProps) {
  const { addressId } = props
  const { handleSubmit, error } = useFormGqlMutation(
    DeleteCustomerAddressFormDocument,
    {
      defaultValues: { id: addressId },
    },
    { errorPolicy: 'all', refetchQueries: ['AccountDashboardAddresses'] },
  )
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button type='submit' variant='text' color='primary'>
        <Trans id='Delete this address' />
      </Button>
      <ApolloErrorSnackbar error={error} />
    </form>
  )
}
