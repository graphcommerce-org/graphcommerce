import { useQuery } from '@apollo/client'
import {
  ApolloCustomerErrorAlert,
  SignInForm,
  SignUpForm,
  useFormIsEmailAvailable,
  CustomerDocument,
  CustomerTokenDocument,
} from '@graphcommerce/magento-customer'
import {
  AnimatedRow,
  Button,
  FormDiv,
  FormActions,
  FormRow,
  LayoutTitle,
  makeStyles,
  typography,
} from '@graphcommerce/next-ui'
import { emailPattern, useFormPersist } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { CircularProgress, Link, TextField, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'

const useStyles = makeStyles({ name: 'AccountSignInUpForm' })((theme) => ({
  titleContainer: {
    ...typography(theme, 'body1'),
    marginBottom: theme.spacings.xs,
  },
}))

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
  const { classes } = useStyles()

  useFormPersist({ form, name: 'IsEmailAvailable' })

  return (
    <FormDiv>
      {mode === 'email' && (
        <div className={classes.titleContainer} key='email'>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Sign in or create an account!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Fill in your e-mail to login or create an account</Trans>
          </Typography>
        </div>
      )}

      {mode === 'signin' && (
        <div className={classes.titleContainer} key='signin'>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Welcome back!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Fill in your password</Trans>
          </Typography>
        </div>
      )}

      {mode === 'signup' && (
        <div className={classes.titleContainer} key='signup'>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Create account!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Create a password and tell us your name</Trans>
          </Typography>
        </div>
      )}

      {mode === 'signedin' && (
        <div className={classes.titleContainer} key='signup'>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Hi {firstname}! You're now logged in!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>You can view</Trans>{' '}
            <PageLink href='/account' passHref>
              <Link underline='hover'>your account here</Link>
            </PageLink>
            .
          </Typography>

          <FormActions>
            <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
              <Trans>Continue shopping</Trans>
            </Button>
          </FormActions>
        </div>
      )}

      {mode === 'session-expired' && (
        <div className={classes.titleContainer} key='email'>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Your session is expired</Trans>
          </LayoutTitle>
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
