import { useQuery } from '@apollo/client'
import {
  CircularProgress,
  Container,
  FormControl,
  makeStyles,
  TextField,
  Theme,
  Typography,
  Link,
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
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
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
  const classes = useStyles()
  const formClasses = useFormStyles()
  const { data: token } = useQuery(CustomerTokenDocument)
  const { data: customerData } = useQuery(CustomerDocument)

  const form = useFormGqlQuery(IsEmailAvailableDocument, {
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: { email: customerData?.customer?.email ?? undefined },
  })
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

  useFormPersist({ form, name: 'IsEmailAvailable' })
  const submit = handleSubmit(() => {})
  const autoSubmitting = useFormAutoSubmit({ form, submit })
  const disableFields = formState.isSubmitting && !autoSubmitting

  const hasAccount = emailAvailable?.isEmailAvailable?.is_email_available === false

  let mode: 'welcome' | 'signin' | 'signup' | 'redirect' = 'welcome'
  if (formState.isSubmitSuccessful && formState.isValid && !formState.isSubmitting && hasAccount)
    mode = 'signin'
  if (formState.isSubmitSuccessful && formState.isValid && !formState.isSubmitting && !hasAccount)
    mode = 'signup'
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
          {mode === 'welcome' && (
            <div className={classes.titleContainer} key='welcome'>
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

          {mode === 'redirect' && (
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
            </div>
          )}

          <AnimatePresence>
            {mode !== 'redirect' && (
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
                        inputRef={register({
                          required: required.email,
                          pattern: { value: emailPattern, message: '' },
                        })}
                        autoComplete='off'
                        disabled={!!token?.customerToken || disableFields}
                        InputProps={{
                          endAdornment: formState.isSubmitting && <CircularProgress />,
                        }}
                      />
                    </div>
                  </AnimatedRow>

                  {mode === 'welcome' && (
                    <AnimatedRow key='submit'>
                      <div className={formClasses.actions}>
                        <FormControl error={!!error}>
                          <Button
                            type='submit'
                            loading={formState.isSubmitting}
                            variant='contained'
                            color='primary'
                            size='large'
                          >
                            Continue
                          </Button>
                        </FormControl>
                      </div>
                    </AnimatedRow>
                  )}

                  <ApolloErrorAlert error={error} />
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
