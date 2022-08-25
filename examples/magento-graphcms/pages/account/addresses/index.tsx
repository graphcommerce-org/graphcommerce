import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountAddresses,
  ApolloCustomerErrorFullPage,
  useCustomerQuery,
} from '@graphcommerce/magento-customer'
import { AccountDashboardAddressesDocument } from '@graphcommerce/magento-customer-account'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  GetStaticProps,
  iconAddresses,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function AccountAddressesPage() {
  const { data, loading, error, called } = useCustomerQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = data?.customer

  if (loading || !called)
    return (
      <FullPageMessage icon={<CircularProgress />} title='Loading your account'>
        <Trans id='This may take a second' />
      </FullPageMessage>
    )
  if (error) return <ApolloCustomerErrorFullPage error={error} />

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Addresses' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Addresses')} metaRobots={['noindex']} />
        {((customer?.addresses && customer.addresses.length > 1) || !customer?.addresses) && (
          <LayoutTitle icon={iconAddresses}>
            <Trans id='Addresses' />
          </LayoutTitle>
        )}
        <AccountAddresses {...data} loading={!data} addresses={customer?.addresses} />
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: 'Account' },
    },
  }
}
