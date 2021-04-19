import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AccountDashboardDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboard.gql'
import AccountHeader from '@reachdigital/magento-customer/AccountHeader'
import AccountLatestOrder from '@reachdigital/magento-customer/AccountLatestOrder'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import AccountMenu from '../../components/AccountMenu'
import SheetLayout, { SheetLayoutProps } from '../../components/AppShell/SheetLayout'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountIndexPage() {
  const { data, loading } = useQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })

  return (
    <Container maxWidth='md'>
      <NoSsr>
        <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />
        <AccountHeader {...data?.customer} loading={loading} />
        <AccountMenu {...data?.customer} loading={loading} />
        <AccountLatestOrder {...data?.customer} loading={loading} />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetLayoutProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetLayout,
  sharedKey: () => 'account',
  sharedProps: { variant: 'bottom', size: 'max' },
}
AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
