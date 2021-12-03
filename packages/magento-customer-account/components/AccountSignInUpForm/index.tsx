import { useQuery } from '@apollo/client'
import {
  ApolloCustomerErrorAlert,
  SignInForm,
  SignUpForm,
  useFormIsEmailAvailable,
  CustomerDocument,
  CustomerTokenDocument,
} from '@graphcommerce/magento-customer'
import { AnimatedRow, Button, FormDiv, FormActions, FormRow } from '@graphcommerce/next-ui'
import { emailPattern, useFormPersist } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { CircularProgress, Link, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    titleContainer: {
      ...theme.typography.body1,
      marginBottom: theme.spacings.xs,
    },
  }),
  { name: 'AccountSignInUpForm' },
)

export default function AccountSignInUpForm() {
  const customerToken = useQuery(CustomerTokenDocument)
  const customerQuery = useQuery(CustomerDocument, {
    ssr: false,
    skip: typeof customerToken.data === 'undefined',
  })

  const { email, firstname } = customerQuery.data?.customer ?? {}
  const { mode, form, autoSubmitting, submit } = useFormIsEmailAvailable({ email })
  const { formState, muiRegister, required, watch, error } = form
  const disableFields = formState.isSubmitting && !autoSubmitting
  const classes = useStyles()

  useFormPersist({ form, name: 'IsEmailAvailable' })

  return (
    <FormDiv>
      {mode === 'email' && (
        <div className={classes.titleContainer} key='email'>
          <Typography variant='h3' align='center'>
            <Trans>Good day!</Trans>
          </Typography>
          <Typography variant='h6' align='center'>
            <Trans>Fill in your e-mail to login or create an account</Trans>
          </Typography>
        </div>
      )}

      {mode === 'signin' && (
        <div className={classes.titleContainer} key='signin'>
          <Typography variant='h3' align='center'>
            <Trans>Welcome back!</Trans>
          </Typography>
          <Typography variant='h6' align='center'>
            <Trans>Fill in your password</Trans>
          </Typography>
        </div>
      )}

      {mode === 'signup' && (
        <div className={classes.titleContainer} key='signup'>
          <Typography variant='h3' align='center'>
            <Trans>Create account!</Trans>
          </Typography>
          <Typography variant='h6' align='center'>
            <Trans>Create a password and tell us your name</Trans>
          </Typography>
        </div>
      )}

      {mode === 'signedin' && (
        <div className={classes.titleContainer} key='signup'>
          <Typography variant='h3' align='center'>
            <Trans>Hi {firstname}! You're now logged in!</Trans>
          </Typography>
          <Typography variant='h6' align='center'>
            <Trans>
              You can view{' '}
              <PageLink href='/account' passHref>
                <Link>your account here</Link>
              </PageLink>
              .
            </Trans>
          </Typography>

          <FormActions>
            <Button onClick={() => router.back()} color='primary' variant='pill' size='large'>
              <Trans>Continue shopping</Trans>
            </Button>
          </FormActions>
        </div>
      )}

      {mode === 'session-expired' && (
        <div className={classes.titleContainer} key='email'>
          <Typography variant='h3' align='center'>
            <Trans>Your session is expired</Trans>
          </Typography>
          <Typography variant='h6' align='center'>
            <Trans>Login to continue shopping</Trans>
          </Typography>
        </div>
      )}

      <AnimatePresence>
        {mode !== 'signedin' && (
          <form noValidate onSubmit={submit} key='emailform'>
            <AnimatedRow key='email'>
              <FormRow>
                <TextField
                  key='email'
                  variant='outlined'
                  type='text'
                  autoComplete='email'
                  error={formState.isSubmitted && !!formState.errors.email}
                  helperText={formState.isSubmitted && formState.errors.email?.message}
                  label={<Trans>Email</Trans>}
                  required={required.email}
                  disabled={disableFields}
                  {...muiRegister('email', {
                    required: required.email,
                    pattern: { value: emailPattern, message: '' },
                  })}
                  InputProps={{
                    endAdornment: formState.isSubmitting && <CircularProgress />,
                    readOnly: !!customerQuery.data?.customer?.email,
                  }}
                />
              </FormRow>
            </AnimatedRow>

            <ApolloCustomerErrorAlert error={error} />

            {(mode === 'email' || mode === 'session-expired') && (
              <AnimatedRow key='submit-form'>
                <FormActions>
                  <Button
                    type='submit'
                    loading={formState.isSubmitting}
                    variant='contained'
                    color='primary'
                    size='large'
                  >
                    <Trans>Continue</Trans>
                  </Button>
                </FormActions>
              </AnimatedRow>
            )}
          </form>
        )}

        {mode === 'signin' && (
          <AnimatedRow key='signin'>
            <SignInForm email={watch('email')} />
          </AnimatedRow>
        )}

        {mode === 'signup' && (
          <AnimatedRow key='signup'>
            <SignUpForm email={watch('email')} />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </FormDiv>
  )
}
