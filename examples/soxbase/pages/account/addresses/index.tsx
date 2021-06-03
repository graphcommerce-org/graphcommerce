import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AccountAddresses, AccountDashboardAddressesDocument } from '@reachdigital/magento-customer'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
  PageMeta,
  StoreConfigDocument,
} from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import MessageAuthRequired from '@reachdigital/next-ui/MessageAuthRequired'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { iconAddresses } from '@reachdigital/next-ui/icons'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function AccountAddressesPage(props: Props) {
  const { countries } = props
  const { data, loading } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })
  const customer = data?.customer

  if (!loading && !customer)
    return <MessageAuthRequired signInHref='/account/signin' signUpHref='/account/signin' />

  return (
    <Container maxWidth='md'>
      <PageMeta
        title='Addresses'
        metaDescription='View all your addresses'
        metaRobots={['noindex']}
      />
      <NoSsr>
        <IconHeader src={iconAddresses} title='Addresses' alt='addresses' size='large' />
        <AccountAddresses
          {...data}
          loading={!data}
          addresses={customer?.addresses}
          countries={countries}
        />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account-addresses',
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
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account',
      backFallbackTitle: 'Account',
    },
  }
}
