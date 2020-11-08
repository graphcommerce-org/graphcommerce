import {
  TextField,
  Button,
  makeStyles,
  Theme,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { emailPattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import React from 'react'
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordDocument,
} from './ForgotPassword.gql'

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
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables & { confirmEmail?: string }
  >(ForgotPasswordDocument)

  const { register, errors, handleSubmit, required, watch, data, formState } = mutationForm

  if (formState.isSubmitSuccessful && data) {
    return (
      <Alert severity='success' variant='standard'>
        We&apos;ve send a password reset link to your account!
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={classes.form}>
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

      <FormControl>
        <Button
          type='submit'
          disabled={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
        >
          Send email
        </Button>
        <FormHelperText error={!!errors.submission?.message}>
          {errors.submission?.message}
        </FormHelperText>
      </FormControl>
    </form>
  )
}
