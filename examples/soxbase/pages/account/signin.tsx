import { useLazyQuery, useQuery } from '@apollo/client'
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
import Close from '@material-ui/icons/Close'
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
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import usePageTransition from '@reachdigital/next-ui/PageTransition/usePageTransition'
import { emailPattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import clsx from 'clsx'
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
    closeBtn: {
      minWidth: 'unset',
      width: 42,
      height: 42,
      borderRadius: '100%',
      textAlign: 'center',
      boxShadow: theme.shadows[1],
      background: theme.palette.background.default,
      '&:hover': {
        background: theme.palette.grey[6],
      },
    },
    submitBtn: {
      maxWidth: '50%',
      margin: '20px auto',
      display: 'block',
      borderRadius: theme.spacings.xs,
      '& > button': {
        width: '100%',
      },
    },
    isEmailAvailableForm: {
      paddingBottom: 0,
    },
  }),
  { name: 'SignIn' },
)

function AccountSignInPage() {
  const signedOut = useSignedOutGuard()
  const classes = useStyles()
  const formClasses = useFormStyles()
  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const [userContinued, setUserContinued] = useState<boolean>(false)

  const { handleSubmit, formState, errors, register, watch } = useForm<{ email: string }>({
    mode: 'onChange',
  })

  const isValidEmail = !!emailPattern.exec(watch('email'))
  const [execute, { data: emailData, loading: emailLoading }] = useLazyQuery(
    IsEmailAvailableDocument,
    {
      variables: { email: watch('email') },
      fetchPolicy: 'no-cache', // TODO: fetchPolicy: 'cache-first',
    },
  )

  useEffect(() => {
    // Solves positioning issues with password managers
    if (isValidEmail) window.dispatchEvent(new Event('resize'))
  }, [isValidEmail])

  const title = 'Sign in'
  // const { prevPage } = usePageTransition({ title })

  if (!signedOut) return null

  const isLoading = emailLoading
  const hasAccount = emailData?.isEmailAvailable?.is_email_available === false
  const endAdornment: React.ReactNode = isLoading ? <CircularProgress /> : null

  const isCustomer = tokenQuery?.customerToken
  const canSignIn =
    Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid) ||
    emailData?.isEmailAvailable?.is_email_available === false

  // const shouldSignIn = !tokenQuery?.customerToken?.valid
  const shouldSignIn = hasAccount
  const signInOrUpReady = isValidEmail && !isLoading && userContinued

  if (!isValidEmail && userContinued) {
    setUserContinued(false)
  }

  console.log(formState.isValid, formState.isSubmitted, formState.isSubmitSuccessful)

  return (
    <OverlayUi title={title} variant='center'>
      <PageMeta
        title={title}
        metaDescription='Sign in to your accoutn'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        {((!signInOrUpReady && !shouldSignIn) || (shouldSignIn && !userContinued)) && (
          <div className={classes.titleContainer}>
            <Typography variant='h3' align='center'>
              Good day!
            </Typography>
            <Typography variant='h6' align='center'>
              Fill in your e-mail to login or create an account
            </Typography>
          </div>
        )}

        {signInOrUpReady && shouldSignIn && (
          <div className={classes.titleContainer}>
            <Typography variant='h3' align='center'>
              Welcome back!
            </Typography>
            <Typography variant='h6' align='center'>
              Fill in your password
            </Typography>
          </div>
        )}

        {signInOrUpReady && !shouldSignIn && (
          <div className={classes.titleContainer}>
            <Typography variant='h3' align='center'>
              Welcome!
            </Typography>
            <Typography variant='h6' align='center'>
              Create a password and tell us your name
            </Typography>
          </div>
        )}

        <form
          noValidate
          onSubmit={debounce(async () => {
            setUserContinued(false)
            if (!formState.isValid) return
            await handleSubmit((variables) => execute({ variables }))()
          }, 500)}
          className={clsx(formClasses.form, {
            [classes.isEmailAvailableForm]: !shouldSignIn && userContinued,
          })}
        >
          <AnimatePresence initial={false}>
            <TextField
              key='email'
              variant='outlined'
              type='text'
              error={formState.isSubmitted && !!errors.email}
              id='email'
              name='email'
              label='E-mail'
              required
              inputRef={register({
                required: true,
                pattern: { value: emailPattern, message: 'Invalid email address' },
              })}
              autoComplete='off'
              InputProps={{ endAdornment }}
              helperText={formState.isSubmitted && errors.email?.message}
            />

            <AnimatedRow key='submit' className={clsx({ [classes.hide]: signInOrUpReady })}>
              <FormControl className={classes.submitBtn}>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  size='large'
                  className={formClasses.submitButton}
                  // onClick={() => {
                  // if (isValidEmail && !isLoading) setUserContinued(true)
                  // }}
                >
                  Continue
                </Button>
              </FormControl>
            </AnimatedRow>
          </AnimatePresence>
        </form>

        {signInOrUpReady && shouldSignIn && (
          <SignInForm onBeforeSubmit={(variables) => variables} />
        )}
        {signInOrUpReady && !shouldSignIn && <SignUpForm email={watch('email')} />}
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
