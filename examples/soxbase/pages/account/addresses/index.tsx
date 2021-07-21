import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  AccountAddresses,
  AccountDashboardAddressesDocument,
  ApolloCustomerErrorFullPage,
} from '@reachdigital/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconAddresses,
  SheetShellHeader,
  Title,
} from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function AccountAddressesPage(props: Props) {
  const { data, loading, error } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })
  const customer = data?.customer

  if (loading) return <></>
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <>
      <SheetShellHeader backFallbackTitle='Account' backFallbackHref='/account'>
        <Title size='small' component='span' icon={iconAddresses}>
          Addresses
        </Title>
      </SheetShellHeader>
      <Container maxWidth='md'>
        <PageMeta
          title='Addresses'
          metaDescription='View all your addresses'
          metaRobots={['noindex']}
        />
        <NoSsr>
          {((customer?.addresses && customer.addresses.length > 1) || !customer?.addresses) && (
            <AppShellTitle icon={iconAddresses}>Addresses</AppShellTitle>
          )}
          <AccountAddresses {...data} loading={!data} addresses={customer?.addresses} />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
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
