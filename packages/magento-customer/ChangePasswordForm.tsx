import {
  TextField,
  Button,
  makeStyles,
  Theme,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { ChangePasswordDocument } from 'generated/documents'

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

export default function ChangePasswordForm() {
  const classes = useStyles()
  const mutationForm = useMutationForm<
    GQLChangePasswordMutation,
    GQLChangePasswordMutationVariables & { confirmPassword?: string }
  >({ mutation: ChangePasswordDocument })

  const { register, errors, onSubmit, required, watch, loading, error, called, data } = mutationForm

  if (called && data) {
    return <div>Password changed!</div>
  }

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <TextField
        variant='outlined'
        type='password'
        // inputProps={{ className: classes.quantityInput, min: 1 }}
        error={!!errors.currentPassword}
        id='currentPassword'
        name='currentPassword'
        label='Current Password'
        required={required.currentPassword}
        inputRef={register({ required: required.currentPassword })}
        helperText={errors.currentPassword?.message}
        disabled={loading}
      />

      <TextField
        variant='outlined'
        type='password'
        // inputProps={{ className: classes.quantityInput, min: 1 }}
        error={!!errors.newPassword}
        id='newPassword'
        name='newPassword'
        label='New Password'
        required={required.newPassword}
        inputRef={register({ required: required.newPassword })}
        helperText={errors.newPassword?.message}
        disabled={loading}
      />

      <TextField
        variant='outlined'
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
        disabled={loading}
      />

      <FormControl>
        <Button type='submit' disabled={loading} color='primary' variant='contained' size='large'>
          Change
        </Button>
        <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
