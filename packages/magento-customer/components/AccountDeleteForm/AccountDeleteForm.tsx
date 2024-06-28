import { EmailElement } from '@graphcommerce/ecommerce-ui'
import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { FormActions, FormRow, Button } from '@graphcommerce/next-ui'
import { useForm } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Typography } from '@mui/material'
import { CustomerDocument, useCustomerQuery } from '../../hooks'
import { signOut } from '../SignOutForm/signOut'
import { WaitForCustomer } from '../WaitForCustomer/WaitForCustomer'
import { DeleteCustomerDocument } from './DeleteCustomer.gql'

export function AccountDeleteForm() {
  const client = useApolloClient()

  const dashboard = useCustomerQuery(CustomerDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = dashboard.data?.customer

  const [deleteAccount, { called, error, loading }] = useMutation(DeleteCustomerDocument)

  const form = useForm<{ email: string }>()

  const { control, handleSubmit, setError } = form

  const submitHandler = handleSubmit(async (data) => {
    if (data.email !== customer?.email) {
      setError('email', {
        message: i18n._('The given email does not match the account email'),
      })
    } else {
      await deleteAccount()
      signOut(client)
    }
  })

  return (
    <>
      {!called || error || loading ? (
        <WaitForCustomer waitFor={dashboard}>
          <Box component='form' onSubmit={submitHandler}>
            <Typography variant='h6' textAlign='center'>
              <Trans id='Are you sure you want to delete your account?' />
            </Typography>
            <Typography variant='body1' textAlign='center'>
              <Trans id='Doing so will remove all your data including order history and saved shipping / billing addresses' />
            </Typography>
            <FormRow>
              <EmailElement control={control} name='email' required />
            </FormRow>
            <FormActions>
              <Button type='submit' loading={loading} color='primary' variant='pill' size='large'>
                <Trans id='Delete account' />
              </Button>
            </FormActions>
          </Box>
        </WaitForCustomer>
      ) : (
        <>
          <Typography variant='h6' textAlign='center'>
            <Trans id='Account deletion successful' />
          </Typography>
          <FormActions>
            <Button variant='pill' href='/' size='large' color='primary'>
              <Trans id='Return to home' />
            </Button>
          </FormActions>
        </>
      )}
    </>
  )
}
