import { useQuery } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Container,
  debounce,
  Divider,
  FormControl,
  FormHelperText,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import SignUpForm from '@reachdigital/magento-customer/SignUpForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import useFormAutoSubmit from '@reachdigital/react-hook-form/useFormAutoSubmit'
import useFormGqlQuery from '@reachdigital/react-hook-form/useFormGqlQuery'
import useFormPersist from '@reachdigital/react-hook-form/useFormPersist'
import { emailPattern } from '@reachdigital/react-hook-form/validationPatterns'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    titleContainer: {
      // marginTop: `calc(${theme.spacings.xxs} * -1)`,
      marginBottom: theme.spacings.xs,
    },
  }),
  { name: 'GuestOrderEmailSignIn' },
)

function AccountSignInPage() {
  // const signedOut = useSignedOutGuard()
  const classes = useStyles()
  const formClasses = useFormStyles()
  const { data: token } = useQuery(CustomerTokenDocument)
  const { data: customerData } = useQuery(CustomerDocument)

  const form = useFormGqlQuery(IsEmailAvailableDocument, {
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: { email: customerData?.customer?.email },
  })

  useFormPersist({ form, name: 'IsEmailAvailable' })
  const {
    handleSubmit,
    formState,
    errors,
    register,
    required,
    data: emailAvailable,
    watch,
    error,
  } = form
  const submit = handleSubmit(() => {})
  const autoSubmitting = useFormAutoSubmit({ form, submit })
  const disableFields = formState.isSubmitting && !autoSubmitting

  // useEffect(() => {
  //   // Solves positioning issues with password managers
  //   if (isValidEmail) window.dispatchEvent(new Event('resize'))
  // }, [isValidEmail])

  // const isLoading = emailLoading
  const hasAccount = emailAvailable?.isEmailAvailable?.is_email_available === false
  // const endAdornment: React.ReactNode = isLoading ? <CircularProgress /> : null

  const signUp = !hasAccount && formState.isSubmitSuccessful
  const signIn = hasAccount && formState.isSubmitSuccessful

  let mode: 'welcome' | 'signin' | 'signup' | 'autenticate' | 'redirect' = 'welcome'
  if (formState.isSubmitSuccessful && hasAccount) mode = 'signin'
  if (formState.isSubmitSuccessful && !hasAccount) mode = 'signup'
  if (token?.customerToken && !token?.customerToken.valid) mode = 'autenticate'
  if (token?.customerToken && token?.customerToken.valid) mode = 'redirect'

  return (
    <OverlayUi title='Sign In' variant='center'>
      <PageMeta
        title='Sign in'
        metaDescription='Sign in to your accoutn'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <div className={formClasses.form}>
          {!formState.isSubmitSuccessful && (
            <div className={classes.titleContainer} key='welcome'>
              <Typography variant='h3' align='center'>
                Good day!
              </Typography>
              <Typography variant='h6' align='center'>
                Fill in your e-mail to login or create an account
              </Typography>
            </div>
          )}

          {formState.isSubmitSuccessful && hasAccount && (
            <div className={classes.titleContainer} key='signin'>
              <Typography variant='h3' align='center'>
                Welcome back!
              </Typography>
              <Typography variant='h6' align='center'>
                Fill in your password
              </Typography>
            </div>
          )}

          {formState.isSubmitSuccessful && !hasAccount && (
            <div className={classes.titleContainer} key='signup'>
              <Typography variant='h3' align='center'>
                Create account!
              </Typography>
              <Typography variant='h6' align='center'>
                Create a password and tell us your name
              </Typography>
            </div>
          )}

          <form noValidate onSubmit={submit}>
            <AnimatePresence initial={false}>
              <AnimatedRow>
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
                    inputRef={register({
                      required: required.email,
                      pattern: { value: emailPattern, message: '' },
                    })}
                    autoComplete='off'
                    disabled={!!token?.customerToken}
                    // disabled={disableFields}
                    InputProps={{ endAdornment: formState.isSubmitting && <CircularProgress /> }}
                  />
                </div>
              </AnimatedRow>

              {!(formState.isValid && formState.isSubmitSuccessful) && (
                <AnimatedRow key='submit'>
                  <div className={formClasses.formRow}>
                    <FormControl>
                      <Button
                        type='submit'
                        disabled={formState.isSubmitting}
                        variant='contained'
                        color='primary'
                        size='large'
                        className={formClasses.submitButton}
                      >
                        Continue
                      </Button>
                    </FormControl>
                    <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                  </div>
                </AnimatedRow>
              )}
            </AnimatePresence>
          </form>

          <AnimatePresence>
            {signIn && formState.isValid && (
              <AnimatedRow key='signin'>
                <SignInForm email={watch('email')} />
              </AnimatedRow>
            )}
            {signUp && formState.isValid && (
              <AnimatedRow key='signup'>
                <SignUpForm email={watch('email')} />
              </AnimatedRow>
            )}
          </AnimatePresence>
        </div>
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
