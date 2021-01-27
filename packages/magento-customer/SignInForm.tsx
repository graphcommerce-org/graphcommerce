import { useQuery } from '@apollo/client'
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  FormControl,
  FormHelperText,
  Link,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { emailPattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import React, { PropsWithChildren } from 'react'
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
    submitBtn: {
      borderRadius: 8,
      margin: '0 auto',
      maxWidth: 'unset',
      width: '50%',
      display: 'block',
    },
    forgotPass: {
      textAlign: 'right',
    },
  }),
  { name: 'SignIn' },
)

type SignInFormProps = PropsWithChildren<{ email: string }>

export default function SignInForm(props: SignInFormProps) {
  const { children, email } = props
  const classes = useStyles()
  const { data } = useQuery(CustomerTokenDocument)
  const mutationForm = useMutationForm(SignInDocument, {
    onComplete: onCompleteSignInUp, // TODO: juiste callback zoeken / bouwen
    defaultValues: { email },
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

      {/* <TextField
        key='email'
        variant='outlined'
        type='text'
        error={!!errors.email}
        id='email'
        name='email'
        label='E-mail'
        inputRef={register({
          required: required.email,
          pattern: { value: emailPattern, message: 'Invalid email address' },
        })}
        helperText={formState.isSubmitted && errors.email?.message}
      /> */}

      <TextField
        key='password'
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

      <PageLink href='/account/forgot-password' key='forgot-password'>
        <Link className={classes.forgotPass}>Forgot password?</Link>
      </PageLink>

      <FormControl>
        <Button
          type='submit'
          disabled={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
          className={classes.submitBtn}
        >
          Log In
        </Button>
        <FormHelperText error={!!errors.submission}>{errors.submission?.message}</FormHelperText>
      </FormControl>

      <div className={classes.actions}>{children}</div>
    </form>
  )
}
