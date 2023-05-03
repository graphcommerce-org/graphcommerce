import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountAddresses,
  useCustomerQuery,
  WaitForCustomer,
  AccountDashboardAddressesDocument,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconAddresses,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function AccountAddressesPage() {
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
}
AccountAddressesPage.pageOptions = pageOptions

export default AccountAddressesPage

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      variantMd: 'bottom',
      up: { href: '/account', title: 'Account' },
    },
  }
})
