import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import ChangePasswordForm from '@reachdigital/magento-customer/ChangePasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountChangePasswordPage() {
  return (
    <Container maxWidth='sm'>
      <PageMeta
        title='Change Password'
        metaDescription='Change your password'
        metaRobots={['noindex']}
      />
      <NoSsr>
        <ChangePasswordForm />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account',
  sharedProps: { variant: 'bottom', size: 'max' },
}
AccountChangePasswordPage.pageOptions = pageOptions

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
