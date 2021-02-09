import { useQuery } from '@apollo/client'
import { TextField, makeStyles, Theme, FormControl } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
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
    forgotPass: {
      textAlign: 'right',
    },
  }),
  { name: 'SignIn' },
)

type SignInFormProps = PropsWithChildren<{ email: string }>

export default function SignInForm(props: SignInFormProps) {
  const { children, email } = props
  // const classes = useStyles()
  const classes = useFormStyles()
  const { data } = useQuery(CustomerTokenDocument)
  const form = useFormGqlMutation(SignInDocument, {
    onComplete: onCompleteSignInUp, // TODO: juiste callback zoeken / bouwen
    defaultValues: { email },
  })
  const { register, errors, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  const requireAuth = Boolean(data?.customerToken && !data?.customerToken.valid)

  return (
    <form onSubmit={submitHandler} noValidate>
      {requireAuth && (
        <Alert severity='error' variant='standard'>
          Your session has expired, please reauthenticate
        </Alert>
      )}

      <div className={classes.formRow}>
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
      </div>

      {/* <PageLink href='/account/forgot-password' key='forgot-password'>
        <Link className={classes.forgotPass}>Forgot password?</Link>
      </PageLink> */}

      <div className={classes.actions}>
        <FormControl>
          <Button
            type='submit'
            loading={formState.isSubmitting}
            color='primary'
            variant='contained'
            size='large'
          >
            Log In
          </Button>
        </FormControl>
      </div>

      <ApolloErrorAlert error={error} />

      <div>{children}</div>
    </form>
  )
}
