import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@lingui/macro'
import { TextField, Alert, SxProps, Theme } from '@mui/material'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from './ForgotPassword.gql'

export function ForgotPasswordForm(props: { sx?: SxProps<Theme> }) {
  const { sx = [] } = props
  const form = useFormGqlMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
  )
  const { muiRegister, handleSubmit, required, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return (
      <Alert
        severity='success'
        variant='standard'
        sx={(theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
        })}
      >
        <Trans>We’ve send a password reset link to your email address!</Trans>
      </Alert>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate sx={sx}>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.email}
          label={<Trans>Email</Trans>}
          required={required.email}
          {...muiRegister('email', {
            required: required.email,
            pattern: { value: emailPattern, message: t`Invalid email address` },
          })}
          helperText={formState.errors.email?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={error} />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
        >
          <Trans>Send password reset email</Trans>
        </Button>
      </FormActions>
    </Form>
  )
}
