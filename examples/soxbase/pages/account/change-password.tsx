import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import ChangePasswordForm from '@reachdigital/magento-customer/ChangePasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayUi'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountChangePasswordPage() {
  return (
    <OverlayPage
      title='Change Password'
      variant='center'
      backFallbackHref='/account'
      backFallbackTitle='Account'
    >
      <PageMeta
        title='Change Password'
        metaDescription='Change your password'
        metaRobots={['noindex']}
      />
      <Container maxWidth='sm'>
        <NoSsr>
          <ChangePasswordForm />
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

AccountChangePasswordPage.Layout = PageLayout

registerRouteUi('/account/change-password', OverlayPage)

export default AccountChangePasswordPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  return {
    props: {
      ...(await pageLayout).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}
