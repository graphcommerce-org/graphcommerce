import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import ForgotPasswordForm from '@reachdigital/magento-customer/ForgotPasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayPage'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountForgotPasswordPage() {
  return (
    <OverlayPage
      title='Forgot Password'
      variant='center'
      backFallbackHref='/account/signin'
      backFallbackTitle='Sign In'
    >
      <PageMeta
        title='Forgot Password'
        metaDescription='Forgot password'
        metaRobots={['noindex']}
      />
      <Container maxWidth='xs'>
        <NoSsr>
          <Typography variant='h3' align='center'>
            Forgot password
          </Typography>
          <Typography variant='h6' align='center'>
            Fill in your e-mail to request changing your password
          </Typography>
          <ForgotPasswordForm />
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

AccountForgotPasswordPage.Layout = PageLayout
AccountForgotPasswordPage.pageOptions = {
  overlay: 'center',
} as PageOptions

export default AccountForgotPasswordPage

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
