import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import ChangePasswordForm from '@reachdigital/magento-customer/ChangePasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountChangePasswordPage() {
  return (
    <OverlayUi title='Change Password' variant='bottom'>
      <PageMeta
        title='Change Password'
        metaDescription='Change your password'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='sm'>
        <NoSsr>
          <ChangePasswordForm />
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AccountChangePasswordPage.Layout = PageLayout

registerRouteUi('/account/change-password', OverlayUi)

export default AccountChangePasswordPage

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
