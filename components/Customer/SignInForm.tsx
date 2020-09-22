import {
  TextField,
  Button,
  makeStyles,
  Theme,
  Link,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { useMutationForm, emailPattern } from 'components/useMutationForm'
import { SignInDocument } from 'generated/apollo'
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
  const { register, errors, onSubmit, required, result } = useMutationForm<
    GQLSignInMutation,
    GQLSignInMutationVariables
  >({ mutation: SignInDocument, onComplete: onCompleteSignInUp })

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
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
        disabled={result.loading}
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
        disabled={result.loading}
      />

      <FormControl>
        <Button
          type='submit'
          disabled={result.loading}
          color='primary'
          variant='contained'
          size='large'
        >
          Log In
        </Button>
        <FormHelperText error={!!result.error?.message}>{result.error?.message}</FormHelperText>
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
