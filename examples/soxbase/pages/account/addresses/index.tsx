import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
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
import SheetLayout, { SheetLayoutProps } from '../../../components/AppShell/SheetLayout'
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
    <Container maxWidth='md'>
      <PageMeta
        title='Addresses'
        metaDescription='View all your addresses'
        metaRobots={['noindex']}
      />
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
  )
}

const pageOptions: PageOptions<SheetLayoutProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetLayout,
  sharedKey: () => 'account-addresses',
  sharedProps: { variant: 'bottom', size: 'max' },
}
AccountAddressesPage.pageOptions = pageOptions

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
