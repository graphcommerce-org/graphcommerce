import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import SignUpForm from '@reachdigital/magento-customer/SignUpForm'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountSignUpPage() {
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <BottomDrawerUi title='Sign Up'>
      <PageMeta
        title='Sign Up'
        metaDescription='Sign up for an account'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='sm'>
        <SignUpForm />
      </Container>
    </BottomDrawerUi>
  )
}

AccountSignUpPage.Layout = PageLayout

registerRouteUi('/account/signup', BottomDrawerUi)

export default AccountSignUpPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()

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
