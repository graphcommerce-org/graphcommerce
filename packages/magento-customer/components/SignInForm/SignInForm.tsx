import { useQuery } from '@apollo/client'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { FormRow, Button, FormActions } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@lingui/macro'
import { FormControl, Link, makeStyles, TextField, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument } from '../../hooks'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignInDocument } from './SignIn.gql'

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
  const { data } = useQuery(CustomerTokenDocument)
  const form = useFormGqlMutation(
    SignInDocument,
    { defaultValues: { email } },
    { errorPolicy: 'all' },
  )

  const { muiRegister, handleSubmit, required, formState, error } = form
  const [remainingError, authError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const submitHandler = handleSubmit(() => {})

  const requireAuth = Boolean(data?.customerToken && !data?.customerToken.valid)

  return (
    <form onSubmit={submitHandler} noValidate>
      {requireAuth && (
        <Alert severity='error' variant='standard'>
          Your session has expired, please reauthenticate
        </Alert>
      )}

      <FormRow>
        <TextField
          key='password'
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!authError}
          label={<Trans>Password</Trans>}
          autoFocus
          autoComplete='current-password'
          id='current-password'
          required={required.password}
          {...muiRegister('password', { required: required.password })}
          InputProps={{
            endAdornment: (
              <PageLink href='/account/forgot-password' key='forgot-password' passHref>
                <Link className={classes.forgotPass}>Forgot password?</Link>
              </PageLink>
            ),
          }}
          helperText={formState.errors.password?.message || authError?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={remainingError} key='error' />

      <FormActions>
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
      </FormActions>
    </form>
  )
}
