import { useQuery } from '@apollo/client'
import { CircularProgress, Link, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { emailPattern, useFormPersist } from '@reachdigital/react-hook-form'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerErrorAlert/ApolloCustomerErrorAlert'
import ContinueShoppingButton from '../ContinueShoppingButton'
import { CustomerDocument } from '../Customer.gql'
import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'
import useFormIsEmailAvailable from '../useFormIsEmailAvailable'

const useStyles = makeStyles(
  (theme: Theme) => ({
    titleContainer: {
      ...theme.typography.body1,
      marginBottom: theme.spacings.xs,
    },
  }),
  { name: 'GuestOrderEmailSignIn' },
)

export default function AccountSignInUpForm() {
  const customerQuery = useQuery(CustomerDocument, { ssr: false })
  const { email, firstname } = customerQuery.data?.customer ?? {}
  const { mode, form, token, autoSubmitting, submit } = useFormIsEmailAvailable({ email })
  const { formState, muiRegister, required, watch, error } = form
  const disableFields = formState.isSubmitting && !autoSubmitting
  const classes = useStyles()

  useFormPersist({ form, name: 'IsEmailAvailable' })

  return (
    <Form component='div'>
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

          <ContinueShoppingButton />
        </div>
      )}

      <AnimatePresence>
        {mode !== 'signedin' && (
          <form noValidate onSubmit={submit} key='emailform'>
            <AnimatePresence initial={false}>
              <AnimatedRow key='email'>
                <FormRow>
                  <TextField
                    key='email'
                    variant='outlined'
                    type='text'
                    autoComplete='username'
                    autoFocus
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
                      readOnly: !!token?.customerToken,
                    }}
                  />
                </FormRow>
              </AnimatedRow>

              <ApolloCustomerErrorAlert error={error} />

              {mode === 'email' && (
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
            </AnimatePresence>
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
    </Form>
  )
}
