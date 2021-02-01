import { useQuery } from '@apollo/client'
import {
  Button,
  FormControl,
  FormHelperText,
  Link,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import React, { PropsWithChildren } from 'react'
import { CustomerTokenDocument } from './CustomerToken.gql'
import { SignInDocument, SignInMutationVariables } from './SignIn.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.xxs,
      gridColumnGap: theme.spacings.xxs,
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

type SignInFormProps = PropsWithChildren<{
  onBeforeSubmit: (variables: Omit<SignInMutationVariables, 'email'>) => SignInMutationVariables
}>

export default function SignInForm(props: SignInFormProps) {
  const { children, onBeforeSubmit } = props
  const classes = useStyles()
  const { data } = useQuery(CustomerTokenDocument)
  const mutationForm = useMutationForm(SignInDocument, {
    onComplete: onCompleteSignInUp, // TODO: correct callback without cart dependency
    onBeforeSubmit,
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
