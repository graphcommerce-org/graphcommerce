import { useQuery } from '@apollo/client'
import { TextField, makeStyles, Theme, FormControl, Link } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import graphqlErrorByCategory from '@reachdigital/magento-graphql/graphqlErrorByCategory'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument } from './CustomerToken.gql'
import { SignInDocument } from './SignIn.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

const useStyles = makeStyles(
  (theme: Theme) => ({
    forgotPass: {
      whiteSpace: 'nowrap',
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
  const { muiRegister, handleSubmit, required, formState, error } = form
  const [remainingError, authError] = graphqlErrorByCategory('graphql-authentication', error)
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
          error={!!formState.errors.password || !!authError}
          label='Password'
          autoFocus
          required={required.password}
          {...muiRegister('password', { required: required.password })}
          FormHelperTextProps={{
            className: classes.forgotPass,
          }}
          InputProps={{
            endAdornment: (
              <PageLink href='/account/forgot-password' key='forgot-password'>
                <Link className={classes.forgotPass}>Forgot password?</Link>
              </PageLink>
            ),
          }}
          helperText={formState.errors.password?.message || authError?.message}
          disabled={formState.isSubmitting}
        />
      </div>

      <ApolloErrorAlert error={remainingError} key='error' />

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
