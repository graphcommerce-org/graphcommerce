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
            Good day!
          </Typography>
          <Typography variant='h6' align='center'>
            Fill in your e-mail to login or create an account
          </Typography>
        </div>
      )}

      {mode === 'signin' && (
        <div className={classes.titleContainer} key='signin'>
          <Typography variant='h3' align='center'>
            Welcome back!
          </Typography>
          <Typography variant='h6' align='center'>
            Fill in your password
          </Typography>
        </div>
      )}

      {mode === 'signup' && (
        <div className={classes.titleContainer} key='signup'>
          <Typography variant='h3' align='center'>
            Create account!
          </Typography>
          <Typography variant='h6' align='center'>
            Create a password and tell us your name
          </Typography>
        </div>
      )}

      {mode === 'signedin' && (
        <div className={classes.titleContainer} key='signup'>
          <Typography variant='h3' align='center'>
            Hi {firstname}! You&apos;re now logged in!
          </Typography>
          <Typography variant='h6' align='center'>
            You can view{' '}
            <PageLink href='/account' passHref>
              <Link>your account here</Link>
            </PageLink>
            .
          </Typography>

          <FormActions>
            <Button
              onClick={() => router.back()}
              color='primary'
              variant='contained'
              size='large'
              text='bold'
            >
              Continue shopping
            </Button>
          </FormActions>
        </div>
      )}

      {mode === 'session-expired' && (
        <div className={classes.titleContainer} key='email'>
          <Typography variant='h3' align='center'>
            Your session is expired
          </Typography>
          <Typography variant='h6' align='center'>
            Login to continue shopping
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
                  label='Email'
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
                    text='bold'
                  >
                    Continue
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
