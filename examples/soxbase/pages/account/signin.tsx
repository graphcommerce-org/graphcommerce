import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import AccountSignInUpForm from '@reachdigital/magento-customer/AccountSignInUpForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayPage'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountSignInPage() {
  return (
    <OverlayPage title='Sign In' variant='center' backFallbackTitle='Home' backFallbackHref='/'>
      <PageMeta
        title='Sign in'
        metaRobots={['noindex']}
        metaDescription='Sign in to your account'
      />
      <Container maxWidth='md'>
        <AccountSignInUpForm />
      </Container>
    </OverlayPage>
  )
}

AccountSignInPage.Layout = PageLayout
AccountSignInPage.pageOptions = {
  overlay: 'center',
} as PageOptions

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
