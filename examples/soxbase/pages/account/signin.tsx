import { useQuery } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Container,
  debounce,
  FormControl,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import SignUpForm from '@reachdigital/magento-customer/SignUpForm'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { emailPattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    titleContainer: {
      marginTop: `calc(${theme.spacings.xxs} * -1)`,
      marginBottom: theme.spacings.sm,
    },
    guestEmailForm: {
      marginBottom: theme.spacings.sm,
    },
    signInFormInline: {
      marginBottom: theme.spacings.lg,
    },
    forgotPass: {
      marginTop: theme.spacings.xxs,
    },
    hide: {
      display: 'none',
    },
  }),
  { name: 'GuestOrderEmailSignIn' },
)

function AccountSignInPage() {
  const signedOut = useSignedOutGuard()
  const classes = useStyles()
  const formClasses = useFormStyles()
  const { data: tokenQuery } = useQuery(CustomerTokenDocument)

  const { handleSubmit, formState, errors, register, watch } = useForm<{ email: string }>({})

  const isValidEmail = !!emailPattern.exec(watch('email'))
  const { data: emailQuery, loading: emailLoading } = useQuery(IsEmailAvailableDocument, {
    skip: !isValidEmail,
    variables: { email: watch('email') ?? '' },
    fetchPolicy: 'no-cache', // TODO: fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    // Solves positioning issues with password managers
    if (isValidEmail) window.dispatchEvent(new Event('resize'))
  }, [isValidEmail])

  const isLoading = emailLoading
  const hasAccount = emailQuery?.isEmailAvailable?.is_email_available === false
  const endAdornment: React.ReactNode = isLoading ? <CircularProgress /> : null

  const signUp = !hasAccount && isValidEmail && !isLoading
  const signIn = hasAccount && isValidEmail && !isLoading

  // TODO: wat doen we als er wel een email is, maar de token is niet authenticated?
  const isCustomer = tokenQuery?.customerToken
  const canSignIn =
    Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid) ||
    emailQuery?.isEmailAvailable?.is_email_available === false

  if (!signedOut) return null

  const shouldSignIn = !tokenQuery?.customerToken?.valid

  return (
    <OverlayUi title='Sign In' headerForward={<div>X</div>} variant='center'>
      <PageMeta
        title='Sign in'
        metaDescription='Sign in to your accoutn'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        {((!isValidEmail && !isLoading) || isLoading) && (
          <div className={classes.titleContainer}>
            <Typography variant='h3' align='center'>
              Good day!
            </Typography>
            <Typography variant='h6' align='center'>
              Fill in your e-mail to login or create an account
            </Typography>
          </div>
        )}

        {signIn && (
          <div className={classes.titleContainer}>
            <Typography variant='h3' align='center'>
              Welcome back!
            </Typography>
            <Typography variant='h6' align='center'>
              Fill in your password
            </Typography>
          </div>
        )}

        {signUp && (
          <div className={classes.titleContainer}>
            <Typography variant='h3' align='center'>
              Welcome!
            </Typography>
            <Typography variant='h6' align='center'>
              Create a password and tell us your name
            </Typography>
          </div>
        )}

        {/* TODO: verplaatsen naar <IsEmailAvailableForm /> */}
        <form
          noValidate
          {...(isValidEmail && {
            onChange: () => {
              debounce(handleSubmit, 500)
            },
          })}
          className={formClasses.form}
        >
          <AnimatePresence initial={false}>
            <TextField
              key='email'
              variant='outlined'
              type='text'
              error={!!errors.email}
              id='email'
              name='email'
              label='E-mail'
              required
              inputRef={register({
                required: true,
                pattern: {
                  value: emailPattern,
                  message: 'Invalid email address',
                },
              })}
              autoComplete='off'
              InputProps={{ endAdornment }}
              helperText={formState.isSubmitted && errors.email?.message}
            />

            <AnimatedRow key='submit'>
              <FormControl>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  size='large'
                  className={formClasses.submitButton}
                  disabled={formState.isSubmitting}
                  // onClick={() => {
                  //   // watch('email') returns undefined after submit, so we have to cache its value
                  //   setCachedEmail(watch('email'))
                  // }}
                >
                  Continue
                </Button>
              </FormControl>
            </AnimatedRow>
          </AnimatePresence>
        </form>

        {signIn && <SignInForm email={watch('email')} />}
        {signUp && <SignUpForm email={watch('email')} />}
      </Container>
    </OverlayUi>
  )
}

AccountSignInPage.Layout = PageLayout

registerRouteUi('/account/signin', OverlayUi)

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      apolloState: client.cache.extract(),
    },
  }
}
