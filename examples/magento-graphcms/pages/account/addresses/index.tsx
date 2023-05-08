import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  AccountAddresses,
  useCustomerQuery,
  WaitForCustomer,
  AccountDashboardAddressesDocument,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta } from '@graphcommerce/magento-store'
import { iconAddresses, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { getLayout } from '../../../components/Layout/layout'

function AccountAddressesPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const addresses = useCustomerQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const { data } = addresses
  const customer = data?.customer

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Addresses' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Addresses')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          {((customer?.addresses && customer.addresses.length >= 1) || !customer?.addresses) && (
            <LayoutTitle icon={iconAddresses}>
              <Trans id='Addresses' />
            </LayoutTitle>
          )}
          <AccountAddresses {...data} loading={!data} addresses={customer?.addresses} />
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
  sharedKey: () => 'account/addresses',
  layoutProps: { variantMd: 'bottom' },
}
AccountAddressesPage.pageOptions = pageOptions

export default AccountAddressesPage

export const getStaticProps = enhanceStaticProps(getLayout, async () => {
  return {
    props: {
      ...(await graphqlQuery(CountryRegionsDocument)).data,
      up: { href: '/account', title: 'Account' },
    },
  }
})
