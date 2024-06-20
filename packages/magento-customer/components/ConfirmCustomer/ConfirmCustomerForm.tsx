import { TextFieldElement, emailPattern, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer/components'
import { FormActions, FormRow, LayoutTitle, iconPerson, Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Alert, Box, FormControl, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ConfirmCustomerDocument } from './ConfirmCustomer.gql'

export function ConfirmCustomerForm() {
  const router = useRouter()

  const form = useFormGqlMutation(ConfirmCustomerDocument, {
    onBeforeSubmit(variables) {
      const { key } = router.query
      variables.key = key?.toString() ?? ''
      return variables
    },
    onComplete(results) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/account/signin?email=${results.data?.confirmEmail?.customer.email}`)
      }, 1000)
    },
  })

  const { control, formState, error, handleSubmit } = form

  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler}>
      <LayoutTitle icon={iconPerson} variant='h2' gutterBottom={false}>
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
          <Trans id='Confirmation succesfull. You will be redirected to the login page...' />
        </Alert>
      )}

      <ApolloCustomerErrorAlert error={error} />
      <FormActions>
        <FormControl>
          <Button
            type='submit'
            loading={formState.isSubmitting}
            color='primary'
            variant='pill'
            size='large'
            disabled={formState.isSubmitSuccessful}
          >
            <Trans id='Confirm registration' />
          </Button>
        </FormControl>
      </FormActions>
    </Box>
  )
}
