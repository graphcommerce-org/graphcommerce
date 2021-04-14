import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import AccountAddresses from '@reachdigital/magento-customer/AccountAddresses'
import { AccountDashboardAddressesDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardAddresses.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import OverlayPage from '../../../components/AppShell/OverlayPage'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

function AccountAddressesPage(props: Props) {
  const { countries } = props
  const { data } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })
  const customer = data?.customer

  return (
    <OverlayPage
      title='Addresses'
      variant='bottom'
      fullHeight
      backFallbackHref='/account'
      backFallbackTitle='Account'
    >
      <PageMeta
        title='Addresses'
        metaDescription='View all your addresses'
        metaRobots={['noindex']}
      />
      <Container maxWidth='md'>
        <NoSsr>
          <IconTitle
            iconSrc='/icons/desktop_addresses.svg'
            title='Addresses'
            alt='addresses'
            size='large'
          />
          <AccountAddresses loading={!data} addresses={customer?.addresses} countries={countries} />
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

AccountAddressesPage.Layout = PageLayout
AccountAddressesPage.pageOptions = {
  overlay: 'bottom',
} as PageOptions

export default AccountAddressesPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
