import { makeStyles, TextField, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { emailPattern, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
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
  const formClasses = useFormStyles()
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
    <form onSubmit={submitHandler} noValidate className={formClasses.form}>
      <div className={formClasses.formRow}>
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
      </div>

      <ApolloErrorAlert error={error} />

      <div className={formClasses.actions}>
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
      </div>
    </form>
  )
}
