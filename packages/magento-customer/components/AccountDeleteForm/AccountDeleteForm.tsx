import { CheckboxElement, EmailElement } from '@graphcommerce/ecommerce-ui'
import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useForm } from '@graphcommerce/react-hook-form'
import { Trans, t } from '@lingui/macro'
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

  const form = useForm<{ email: string; confirm: boolean }>()

  const { control, handleSubmit, setError } = form

  const submitHandler = handleSubmit(async (data) => {
    if (data.email !== customer?.email) {
      setError('email', {
        message: t`The given email does not match the account email`,
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
          <Box component='form' onSubmit={submitHandler} noValidate>
            <Typography variant='h6' textAlign='center'>
              <Trans>Are you sure you want to delete your account?</Trans>
            </Typography>
            <Typography variant='body1' textAlign='center'>
              <Trans>
                Doing so will remove all your data including order history and saved shipping /
                billing addresses.
              </Trans>
            </Typography>

            <FormRow>
              <EmailElement control={control} name='email' required />
            </FormRow>

            <CheckboxElement
              required
              control={control}
              name='confirm'
              color='error'
              label={
                <Trans>
                  I understand that my account will be deleted and this can not be undone.
                </Trans>
              }
            />
            <FormActions>
              <Button
                type='submit'
                loading={loading}
                color='error'
                variant='pill'
                size='large'
                sx={{ color: 'white', bgcolor: 'error.main' }}
              >
                <Trans>Delete account</Trans>
              </Button>
            </FormActions>
          </Box>
        </WaitForCustomer>
      ) : (
        <>
          <Typography variant='h6' textAlign='center'>
            <Trans>Account deletion successful</Trans>
          </Typography>
          <FormActions>
            <Button variant='pill' href='/' size='large' color='primary'>
              <Trans>Return to home</Trans>
            </Button>
          </FormActions>
        </>
      )}
    </>
  )
}
