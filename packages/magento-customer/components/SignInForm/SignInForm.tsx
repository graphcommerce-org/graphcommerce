import { useQuery } from '@apollo/client'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { FormRow, Button, FormActions , makeStyles } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { FormControl, Link, TextField , Alert } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument } from '../../hooks'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignInDocument } from './SignIn.gql'

const useStyles = makeStyles({ name: 'SignIn' })({
  forgotPass: {
    whiteSpace: 'nowrap',
  },
})

type SignInFormProps = { email: string }

export default function SignInForm(props: SignInFormProps) {
  const { email } = props
  const { classes } = useStyles()
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

  return (
    <form onSubmit={submitHandler} noValidate>
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
                <Link className={classes.forgotPass} underline='hover'>
                  <Trans>Forgot password?</Trans>
                </Link>
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
            <Trans>Log In</Trans>
          </Button>
        </FormControl>
      </FormActions>
    </form>
  )
}
