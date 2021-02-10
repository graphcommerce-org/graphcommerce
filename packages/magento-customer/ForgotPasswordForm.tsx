import { TextField, makeStyles, Theme, FormControl } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { emailPattern } from '@reachdigital/react-hook-form/validationPatterns'
import React from 'react'
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordDocument,
} from './ForgotPassword.gql'

export default function ForgotPasswordForm() {
  const classes = useFormStyles()
  const form = useFormGqlMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables & { confirmEmail?: string }
  >(ForgotPasswordDocument)
  const { register, errors, handleSubmit, required, watch, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return (
      <Alert severity='success' variant='standard'>
        We&apos;ve send a password reset link to your account!
      </Alert>
    )
  }

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <div className={classes.formRow}>
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

      <div className={classes.formRow}>
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
      <div className={classes.actions}>
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
