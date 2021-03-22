import { makeStyles, TextField, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { emailPattern } from '@reachdigital/react-hook-form/validationPatterns'
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
  const form = useFormGqlMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables & { confirmEmail?: string }
  >(ForgotPasswordDocument)
  const { register, errors, handleSubmit, required, watch, data, formState, error } = form
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
          // inputProps={{ className: classes.quantityInput, min: 1 }}
          error={!!errors.email}
          id='email'
          name='email'
          label='Email'
          required={required.email}
          inputRef={register({
            required: required.email,
            pattern: { value: emailPattern, message: 'Invalid email address' },
          })}
          helperText={errors.email?.message}
          disabled={formState.isSubmitting}
        />
      </div>

      <div className={formClasses.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.confirmEmail}
          id='confirmEmail'
          name='confirmEmail'
          label='Confirm Email'
          required
          inputRef={register({
            required: true,
            validate: (value) => value === watch('email') || "Emails don't match",
          })}
          helperText={errors.confirmEmail?.message}
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
        >
          Send email
        </Button>
      </div>
    </form>
  )
}
