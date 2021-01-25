import { useQuery } from '@apollo/client'
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
import { PropsWithChildren } from 'react'
import { CustomerTokenDocument } from './CustomerToken.gql'
import { SignInDocument } from './SignIn.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
    },
    actions: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      paddingBottom: theme.spacings.xs,
      '& :last-child': {
        textAlign: 'right',
      },
    },
  }),
  { name: 'SignIn' },
)

type SignInFormProps = PropsWithChildren<unknown> & {
  email?: string
}

export default function SignInForm(props: SignInFormProps) {
  const { children, email } = props
  const classes = useStyles()
  const { data } = useQuery(CustomerTokenDocument)
  const mutationForm = useMutationForm(SignInDocument, {
    onComplete: onCompleteSignInUp,
    defaultValues: {
      email: email ?? '',
    },
  })
  const { register, errors, handleSubmit, required, formState } = mutationForm

  const requireAuth = Boolean(data?.customerToken && !data?.customerToken.valid)

  return (
    <form onSubmit={handleSubmit} noValidate className={classes.form}>
      {requireAuth && (
        <Alert severity='error' variant='standard'>
          Your session has expired, please reauthenticate
        </Alert>
      )}
      <TextField
        variant='outlined'
        type='text'
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
        type='password'
        error={!!errors.password}
        id='password'
        name='password'
        label='Password'
        required={required.password}
        inputRef={register({ required: required.password })}
        helperText={errors.password?.message}
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
          Log In
        </Button>
        <FormHelperText error={!!errors.submission}>{errors.submission?.message}</FormHelperText>
      </FormControl>

      <div className={classes.actions}>{children}</div>
    </form>
  )
}
