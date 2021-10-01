import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { TextField, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Alert } from '@mui/material';
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from './ForgotPassword.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    alert: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
    },
  }),
  { name: 'ForgotPasswordForm' },
)

export default function ForgotPasswordForm() {
  const classes = useStyles()
  const form = useFormGqlMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
  )
  const { muiRegister, handleSubmit, required, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return (
      <Alert severity='success' variant='standard' className={classes.alert}>
        We&apos;ve send a password reset link to your account!
      </Alert>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.email}
          label='Email'
          required={required.email}
          {...muiRegister('email', {
            required: required.email,
            pattern: { value: emailPattern, message: 'Invalid email address' },
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
          text='bold'
        >
          Send password reset email
        </Button>
      </FormActions>
    </Form>
  )
}
