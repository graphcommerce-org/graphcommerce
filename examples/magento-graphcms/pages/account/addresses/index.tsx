import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { AccountAddresses, ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
import { AccountDashboardAddressesDocument } from '@graphcommerce/magento-customer-account'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconAddresses,
  SheetAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutSheet, LayoutSheetProps } from '../../../components/Layout/LayoutSheet'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutSheetProps, Props>

function AccountAddressesPage() {
  const { data, loading, error } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })
  const customer = data?.customer

  if (loading) return <div />
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
      <SheetAppBar>
        <Title size='small' component='span' icon={iconAddresses}>
          <Trans>Addresses</Trans>
        </Title>
      </SheetAppBar>
      <Container maxWidth='md'>
        <PageMeta
          title={t`Addresses`}
          metaDescription={t`View all your addresses`}
          metaRobots={['noindex']}
        />
        <NoSsr>
          {((customer?.addresses && customer.addresses.length > 1) || !customer?.addresses) && (
            <AppShellTitle icon={iconAddresses}>
              <Trans>Addresses</Trans>
            </AppShellTitle>
          )}
          <AccountAddresses {...data} loading={!data} addresses={customer?.addresses} />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutSheetProps> = {
  overlayGroup: 'account',
  Layout: LayoutSheet,
  sharedKey: () => 'account/addresses',
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
      up: { href: '/account', title: 'Account' },
    },
  }
}
