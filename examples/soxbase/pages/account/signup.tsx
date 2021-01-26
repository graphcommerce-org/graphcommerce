import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import SignUpForm from '@reachdigital/magento-customer/SignUpForm'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountSignUpPage() {
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <OverlayUi title='Sign Up' variant='center'>
      <PageMeta
        title='Sign Up'
        metaDescription='Sign up for an account'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='sm'>
        <SignUpForm />
      </Container>
    </OverlayUi>
  )
}

AccountSignUpPage.Layout = PageLayout

registerRouteUi('/account/signup', OverlayUi)

export default AccountSignUpPage

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
