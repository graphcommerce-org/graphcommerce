import {
  TextField,
  Button,
  makeStyles,
  Theme,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from './ChangePassword.gql'

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
  const form = useFormGqlMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables & { confirmPassword?: string }
  >(ChangePasswordDocument)
  const { register, errors, handleSubmit, required, watch, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return <div>Password changed!</div>
  }

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
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
        disabled={formState.isSubmitting}
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
        disabled={formState.isSubmitting}
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
          Change
        </Button>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
