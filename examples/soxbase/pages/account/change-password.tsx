import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import ChangePasswordForm from '@reachdigital/magento-customer/ChangePasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayPage'
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
AccountChangePasswordPage.pageOptions = {
  overlay: 'center',
} as PageOptions

export default AccountChangePasswordPage

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
