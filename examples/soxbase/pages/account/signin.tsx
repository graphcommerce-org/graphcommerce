import { useQuery } from '@apollo/client'
import { Button, Container, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import EmailForm from '@reachdigital/magento-cart/email/EmailForm'
import GuestEmailForm from '@reachdigital/magento-cart/email/GuestEmailForm'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import React, { useState } from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    titleContainer: {
      marginTop: `calc(${theme.spacings.sm} * -1)`,
      marginBottom: theme.spacings.md,
    },
    title: {},
    description: {},
    guestEmailForm: {
      marginBottom: theme.spacings.sm,
    },
    signInFormInline: {
      marginBottom: theme.spacings.lg,
    },
    forgotPass: {
      marginTop: theme.spacings.xxs,
    },
    continueBtn: {
      '& > button': {
        width: '50%',
        maxWidth: 'unset',
        borderRadius: theme.spacings.xxs,
        margin: `${theme.spacings.xs} auto`,
        display: 'block',
        marginTop: theme.spacings.md,
        marginBottom: theme.spacings.lg,
      },
    },
    hide: {
      display: 'none',
    },
  }),
  { name: 'GuestOrderEmailSignIn' },
)

function AccountSignInPage() {
  const signedOut = useSignedOutGuard()
  const [expand, setExpand] = useState(false)
  const classes = useStyles()
  const [hasAccount, setHasAccount] = useState<boolean>()
  const { data: cartQuery } = useQuery(ClientCartDocument)

  if (!signedOut) return null

  return (
    <OverlayUi
      title=''
      // headerForward={
      //   // <PageLink href='/account/signup'>
      //   //   <Button color='primary'>Create account</Button>
      //   // </PageLink>
      // }
      variant='center'
    >
      <PageMeta title='Sign in' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='sm'>
        <AnimatePresence initial={false} key='signin-form'>
          <AnimatedRow key='guest-email-form' className={classes.guestEmailForm}>
            <m.div layout='position' className={classes.titleContainer}>
              {expand ? (
                <>
                  <Typography variant='h3' align='center' className={classes.title}>
                    Welcome back!
                  </Typography>
                  <Typography variant='h6' align='center' className={classes.description}>
                    Fill in your password
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant='h3' align='center' className={classes.title}>
                    Good day!
                  </Typography>
                  <Typography variant='h6' align='center' className={classes.description}>
                    Fill in your e-mail to login or create an account
                  </Typography>
                </>
              )}
            </m.div>

            {!expand ? (
              <>
                <GuestEmailForm
                  key='guest-email-form'
                  onHasAccount={() => {
                    setHasAccount(true)
                  }}
                  onHasNoAccount={() => {
                    setHasAccount(false)
                  }}
                />
              </>
            ) : (
              <>
                <SignInForm email={cartQuery?.cart?.email ?? ''} />
              </>
            )}

            {hasAccount ? (
              <div
                className={clsx(classes.continueBtn, {
                  [classes.hide]: expand,
                })}
              >
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  size='large'
                  onClick={() => {
                    setExpand(true)
                  }}
                >
                  Continue
                </Button>
              </div>
            ) : (
              <>
                <PageLink href='/account/signup'>
                  <Button type='submit' color='primary' variant='contained' size='large'>
                    Continue
                  </Button>
                </PageLink>
              </>
            )}
          </AnimatedRow>
        </AnimatePresence>
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
