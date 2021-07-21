import { useQuery } from '@apollo/client'
import { FormControl, Link, makeStyles, TextField, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import { FormRow, Button, FormActions } from '@reachdigital/next-ui'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument, SignInDocument } from '../hooks'
import ApolloCustomerErrorAlert from './ApolloCustomerError/ApolloCustomerErrorAlert'

const useStyles = makeStyles(
  (theme: Theme) => ({
    forgotPass: {
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'SignIn' },
)

type SignInFormProps = { email: string; hideSessionExpiredAlert?: boolean }

export default function SignInForm(props: SignInFormProps) {
  const { email, hideSessionExpiredAlert = false } = props
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
      {!hideSessionExpiredAlert && requireAuth && (
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
          label='Password'
          autoFocus
          autoComplete='current-password'
          id='current-password'
          required={required.password}
          {...muiRegister('password', { required: required.password })}
          FormHelperTextProps={{
            className: classes.forgotPass,
          }}
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
            text='bold'
          >
            Log In
          </Button>
        </FormControl>
      </FormActions>
    </form>
  )
}
