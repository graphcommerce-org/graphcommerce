import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  CircularProgress,
  Container,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import { SetGuestEmailOnCartDocument } from '@reachdigital/magento-cart/email/SetGuestEmailOnCart.gql'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import SignUpForm from '@reachdigital/magento-customer/SignUpForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import useFormAutoSubmit from '@reachdigital/react-hook-form/useFormAutoSubmit'
import useFormGqlQuery from '@reachdigital/react-hook-form/useFormGqlQuery'
import useFormPersist from '@reachdigital/react-hook-form/useFormPersist'
import { emailPattern } from '@reachdigital/react-hook-form/validationPatterns'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import OverlayPage from '../../components/AppShell/OverlayPage'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

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

function AccountSignInPage() {
  const classes = useStyles()
  const formClasses = useFormStyles()

  const { data: customerData } = useQuery(CustomerDocument)

  const { data: token } = useQuery(CustomerTokenDocument)

  const email = customerData?.customer?.email ?? undefined
  const form = useFormGqlQuery(IsEmailAvailableDocument, {
    mode: 'onChange',
    defaultValues: { email },
  })
  const { handleSubmit, formState, errors, register, required, data, watch, error } = form

  useFormPersist({ form, name: 'IsEmailAvailable' })

  // const [execute] = useMutation(SetGuestEmailOnCartDocument)
  // const submit = handleSubmit(({ email }) => execute({ variables: { email, cartId: 'adfsasdf' } }))
  const submit = handleSubmit(() => {})
  const autoSubmitting = useFormAutoSubmit({ form, submit })
  const disableFields = formState.isSubmitting && !autoSubmitting

  const hasAccount = data?.isEmailAvailable?.is_email_available === false

  const [mode, setMode] = useState<'email' | 'signin' | 'signup' | 'signedin'>('email')
  useEffect(() => {
    if (formState.isSubmitting) return
    if (formState.isSubmitSuccessful && formState.isValid && hasAccount) setMode('signin')
    if (formState.isSubmitSuccessful && formState.isValid && !hasAccount) setMode('signup')
    if (token?.customerToken && token?.customerToken.valid) setMode('signedin')
  }, [
    formState.isSubmitSuccessful,
    formState.isSubmitting,
    formState.isValid,
    hasAccount,
    token?.customerToken,
  ])

  const router = useRouter()

  return (
    <OverlayPage title='Sign In' variant='center' backFallbackTitle='Home' backFallbackHref='/'>
      <PageMeta
        title='Sign in'
        metaRobots={['noindex']}
        metaDescription='Sign in to your account'
      />
      <Container maxWidth='md'>
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
                Hi {customerData?.customer?.firstname}! You&apos;re now logged in!
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
                        error={formState.isSubmitted && !!errors.email}
                        helperText={formState.isSubmitted && errors.email?.message}
                        id='email'
                        name='email'
                        label='E-mail'
                        required={required.email}
                        disabled={disableFields}
                        inputRef={register({
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
      </Container>
    </OverlayPage>
  )
}

AccountSignInPage.Layout = PageLayout

registerRouteUi('/account/signin', OverlayPage)

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
