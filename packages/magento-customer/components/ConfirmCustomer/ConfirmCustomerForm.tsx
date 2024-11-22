import { EmailElement, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { Button, FormRow, LayoutTitle, iconPerson } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Alert, Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { ConfirmCustomerDocument } from './ConfirmCustomer.gql'

export function ConfirmCustomerForm() {
  const router = useRouter()

  const key = `${router.query.key ?? ''}`

  const form = useFormGqlMutation(
    ConfirmCustomerDocument,
    {
      onBeforeSubmit(variables) {
        return { ...variables, key }
      },
    },
    { errorPolicy: 'all' },
  )

  const { control, formState, error, handleSubmit, submittedVariables } = form
  const isSubmitSuccessful = formState.isSubmitSuccessful && !error

  const submitHandler = handleSubmit(() => {})

  const signInButton = (
    <Button variant='text' size='small' href={`/account/signin?email=${submittedVariables?.email}`}>
      <Trans id='Sign in' />
    </Button>
  )

  return (
    <Box component='form' onSubmit={submitHandler}>
      <LayoutTitle icon={iconPerson}>
        <Trans id='Account confirmation' />
      </LayoutTitle>

      {!key && (
        <Alert severity='error' sx={(theme) => ({ my: theme.spacings.xxs })}>
          <Trans id='You can only confirm you account by clicking on the link in your email.' />
        </Alert>
      )}
      {key && (
        <>
          <Typography variant='h6' textAlign='center'>
            <Trans id='Fill in your email to confirm registration' />
          </Typography>

          <FormRow>
            <EmailElement
              variant='outlined'
              control={control}
              name='email'
              required
              autoFocus
              disabled={isSubmitSuccessful}
            />
          </FormRow>

          <FormRow sx={{ justifyItems: 'center' }}>
            <Button
              type='submit'
              loading={formState.isSubmitting}
              color='primary'
              variant='pill'
              size='large'
              disabled={isSubmitSuccessful}
            >
              <Trans id='Confirm registration' />
            </Button>
          </FormRow>

          <ApolloCustomerErrorAlert
            sx={(theme) => ({ my: theme.spacings.xxs })}
            error={error}
            graphqlErrorAlertProps={{ action: signInButton }}
          />

          {isSubmitSuccessful && (
            <Alert
              severity='success'
              sx={(theme) => ({ my: theme.spacings.xxs })}
              action={signInButton}
            >
              <Trans id='Account confirmed. You can now proceed to sign in.' />
            </Alert>
          )}
        </>
      )}
    </Box>
  )
}
