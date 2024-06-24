import { TextFieldElement, emailPattern, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { FormActions, FormRow, LayoutTitle, Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Alert, Box, FormControl, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { ConfirmCustomerDocument } from './ConfirmCustomer.gql'

export function ConfirmCustomerForm() {
  const router = useRouter()

  const form = useFormGqlMutation(ConfirmCustomerDocument, {
    onBeforeSubmit(variables) {
      const { key } = router.query
      variables.key = key?.toString() ?? ''
      return variables
    },
  })

  const { control, formState, error, handleSubmit, data: responseData } = form

  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler}>
      <LayoutTitle variant='h2' gutterBottom={false}>
        <Trans id='Account confirmation' />
      </LayoutTitle>
      <Typography variant='h6' textAlign='center'>
        <Trans id='Fill in your email to confirm registration' />
      </Typography>
      <FormRow>
        <TextFieldElement
          variant='outlined'
          control={control}
          name='email'
          required
          type='email'
          autoFocus
          rules={{
            required: true,
            pattern: { value: emailPattern, message: '' },
          }}
          error={formState.isSubmitted && !!formState.errors.email}
          label={<Trans id='Email' />}
        />
      </FormRow>
      {formState.isSubmitSuccessful && (
        <Alert severity='success'>
          <Trans id='Confirmation succesfull. Use the button below to redirect to login' />
        </Alert>
      )}

      <ApolloCustomerErrorAlert error={error} />
      <FormActions>
        {!formState.isSubmitSuccessful || error ? (
          <FormControl>
            <Button
              type='submit'
              loading={formState.isSubmitting}
              color='primary'
              variant='pill'
              size='large'
            >
              <Trans id='Confirm registration' />
            </Button>
          </FormControl>
        ) : (
          <Button
            variant='pill'
            color='info'
            size='large'
            href={`/account/signin?email=${responseData?.confirmEmail?.customer.email}`}
          >
            <Trans id='To login' />
          </Button>
        )}
      </FormActions>
    </Box>
  )
}
