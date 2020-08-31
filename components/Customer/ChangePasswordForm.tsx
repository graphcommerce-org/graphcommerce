import { TextField, Button, makeStyles, Theme, Link } from '@material-ui/core'
import { useMutationForm, emailPattern } from 'components/useMutationForm'
import { ChangePasswordDocument } from 'generated/apollo'
import NextLink from 'next/link'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
    },
    error: {
      color: theme.palette.error.main,
    },
  }),
  { name: 'SignIn' },
)

export default function ChangePasswordForm() {
  const classes = useStyles()
  const { register, errors, onSubmit, required, result, watch } = useMutationForm<
    GQLChangePasswordMutation,
    GQLChangePasswordMutationVariables & { confirmPassword: string }
  >({ mutation: ChangePasswordDocument })

  if (result.called && result.data) {
    return <div>Password changed!</div>
  }

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <TextField
        variant='filled'
        type='password'
        // inputProps={{ className: classes.quantityInput, min: 1 }}
        error={!!errors.currentPassword}
        id='currentPassword'
        name='currentPassword'
        label='Current Password'
        required={required.currentPassword}
        inputRef={register({ required: required.currentPassword })}
        helperText={errors.currentPassword?.message}
        disabled={result.loading}
      />

      <TextField
        variant='filled'
        type='password'
        // inputProps={{ className: classes.quantityInput, min: 1 }}
        error={!!errors.newPassword}
        id='newPassword'
        name='newPassword'
        label='New Password'
        required={required.newPassword}
        inputRef={register({ required: required.newPassword })}
        helperText={errors.newPassword?.message}
        disabled={result.loading}
      />

      <TextField
        variant='filled'
        type='password'
        error={!!errors.confirmPassword}
        id='confirmPassword'
        name='confirmPassword'
        label='Confirm Password'
        required
        inputRef={register({
          required: true,
          validate: (value) => value === watch('newPassword') || "Paswords don't match",
        })}
        helperText={errors.confirmPassword?.message}
        disabled={result.loading}
      />

      <Button
        type='submit'
        disabled={result.loading}
        color='primary'
        variant='contained'
        size='large'
      >
        Change Password
      </Button>

      {!result.loading && result.error?.message && (
        <div className={classes.error}>{result.error?.message}</div>
      )}
    </form>
  )
}
