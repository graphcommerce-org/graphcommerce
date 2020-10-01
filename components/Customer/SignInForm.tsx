import { useQuery } from '@apollo/client'
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  Link,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useMutationForm, emailPattern } from 'components/useMutationForm'
import { CustomerTokenDocument, SignInDocument } from 'generated/documents'
import NextLink from 'next/link'
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

export default function SignInForm() {
  const classes = useStyles()
  const { data } = useQuery(CustomerTokenDocument)
  const { register, errors, onSubmit, required, loading, error } = useMutationForm<
    GQLSignInMutation,
    GQLSignInMutationVariables
  >({ mutation: SignInDocument, onComplete: onCompleteSignInUp })

  const requireAuth = Boolean(data?.customerToken && !data?.customerToken.valid)

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      {requireAuth && (
        <Alert severity='error' variant='standard'>
          Your session has expired, please reauthenticate
        </Alert>
      )}
      <TextField
        variant='filled'
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
        helperText={errors?.email?.message}
        disabled={loading}
      />
      <TextField
        variant='filled'
        type='password'
        error={!!errors.password}
        id='password'
        name='password'
        label='Password'
        required={required.password}
        inputRef={register({ required: required.password })}
        helperText={errors?.password?.message}
        disabled={loading}
      />

      <FormControl>
        <Button type='submit' disabled={loading} color='primary' variant='contained' size='large'>
          Log In
        </Button>
        <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
      </FormControl>

      <div className={classes.actions}>
        <NextLink href='/' passHref>
          <Link>Forgot password? (todo)</Link>
        </NextLink>
        <NextLink href='/account/signup' passHref>
          <Link>Create a new account?</Link>
        </NextLink>
      </div>
    </form>
  )
}
