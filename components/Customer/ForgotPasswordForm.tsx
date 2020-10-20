import {
  TextField,
  Button,
  makeStyles,
  Theme,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { emailPattern, useMutationForm } from 'components/useMutationForm'
import { ForgotPasswordDocument } from 'generated/documents'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
    },
  }),
  { name: 'SignIn' },
)

export default function ForgotPasswordForm() {
  const classes = useStyles()
  const mutationForm = useMutationForm<
    GQLForgotPasswordMutation,
    GQLForgotPasswordMutationVariables & { confirmEmail?: string }
  >({ mutation: ForgotPasswordDocument })

  const { register, errors, onSubmit, required, watch, loading, error, called, data } = mutationForm

  if (called && data) {
    return (
      <Alert severity='success' variant='standard'>
        We&apos;ve send a password reset link to your account!
      </Alert>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
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
        disabled={loading}
      />

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
        disabled={loading}
      />

      <FormControl>
        <Button type='submit' disabled={loading} color='primary' variant='contained' size='large'>
          Send email
        </Button>
        <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
