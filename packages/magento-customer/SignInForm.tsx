import { useQuery } from '@apollo/client'
import { TextField, makeStyles, Theme, FormControl, Link, FormHelperText } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
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
    forgotPass: {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
    },
  }),
  { name: 'SignIn' },
)

type SignInFormProps = { email: string }

export default function SignInForm(props: SignInFormProps) {
  const { email } = props
  const classes = useStyles()
  const formClasses = useFormStyles()
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

      <div className={formClasses.formRow}>
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
          FormHelperTextProps={{
            className: classes.forgotPass,
          }}
          helperText={
            <>
              <div>{errors.password?.message}</div>
              <PageLink href='/account/forgot-password' key='forgot-password'>
                <Link className={classes.forgotPass}>Forgot password?</Link>
              </PageLink>
            </>
          }
          disabled={formState.isSubmitting}
        />
      </div>

      <ApolloErrorAlert error={error} key='error' />

      <div className={formClasses.actions}>
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
    </form>
  )
}
