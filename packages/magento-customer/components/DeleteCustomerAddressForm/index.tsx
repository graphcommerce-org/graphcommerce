import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Button, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router'
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { DeleteCustomerAddressFormDocument } from './DeleteCustomerAddressForm.gql'

export type DeleteCustomerAddressFormProps = {
  addressId?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    display: 'block',
    color: theme.palette.primary.contrastText,
  },
}))

export default function DeleteCustomerAddressForm(props: DeleteCustomerAddressFormProps) {
  const { addressId } = props
  const router = useRouter()
  const classes = useStyles()
  const { handleSubmit, error } = useFormGqlMutation(
    DeleteCustomerAddressFormDocument,
    {
      defaultValues: {
        id: addressId,
      },
      onComplete: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push({ pathname: '/account/addresses', query: 'confirm_delete' })
      },
    },
    { errorPolicy: 'all' },
  )
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button type='submit' variant='text' color='inherit' className={classes.button}>
        Delete this address
      </Button>
      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}
