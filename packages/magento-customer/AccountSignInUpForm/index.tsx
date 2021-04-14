import { useQuery } from '@apollo/client'
import { makeStyles, Theme, Typography, Link, TextField, CircularProgress } from '@material-ui/core'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormPersist, emailPattern } from '@reachdigital/react-hook-form'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
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
    continueShoppingButton: {
      display: 'block',
      margin: `${theme.spacings.md} auto 0 auto`,
      maxWidth: 'max-content',
    },
  }),
  { name: 'GuestOrderEmailSignIn' },
)

export default function AccountSignInUpForm() {
  const classes = useStyles()
  const router = useRouter()
  const formClasses = useFormStyles()

  const customerQuery = useQuery(CustomerDocument, { ssr: false })
  const { email, firstname } = customerQuery.data?.customer ?? {}
  const { mode, form, token, isManualSubmitting, submit } = useFormIsEmailAvailable({ email })
  const { formState, muiRegister, required, watch, error } = form

  useFormPersist({ form, name: 'IsEmailAvailable' })

  return (
    <div className={formClasses.form}>
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
            <PageLink href='/account'>
              <Link>your Account here</Link>
            </PageLink>
            .
          </Typography>

          <Button
            onClick={() => router.back()}
            color='primary'
            variant='contained'
            size='large'
            className={classes.continueShoppingButton}
          >
            Continue shopping
          </Button>
        </div>
      )}

      <AnimatePresence>
        {mode !== 'signedin' && (
          <form noValidate onSubmit={submit} key='emailform'>
            <AnimatePresence initial={false}>
              <AnimatedRow key='email'>
                <div className={formClasses.formRow}>
                  <TextField
                    key='email'
                    variant='outlined'
                    type='text'
                    error={formState.isSubmitted && !!formState.errors.email}
                    helperText={formState.isSubmitted && formState.errors.email?.message}
                    label='Email'
                    required={required.email}
                    disabled={isManualSubmitting}
                    {...muiRegister('email', {
                      required: required.email,
                      pattern: { value: emailPattern, message: '' },
                    })}
                    InputProps={{
                      endAdornment: formState.isSubmitting && <CircularProgress />,
                      readOnly: !!token?.customerToken,
                    }}
                  />
                </div>
              </AnimatedRow>

              <ApolloErrorAlert error={error} />

              {mode === 'email' && (
                <AnimatedRow key='submit'>
                  <div className={formClasses.actions}>
                    <Button
                      type='submit'
                      loading={formState.isSubmitting}
                      variant='contained'
                      color='primary'
                      size='large'
                    >
                      Continue
                    </Button>
                  </div>
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
    </div>
  )
}
