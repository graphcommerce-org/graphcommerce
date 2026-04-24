import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountAddresses,
  AccountDashboardAddressesDocument,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { iconAddresses, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

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
          <Trans>Addresses</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Addresses`} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          {((customer?.addresses && customer.addresses.length >= 1) || !customer?.addresses) && (
            <LayoutTitle icon={iconAddresses}>
              <Trans>Addresses</Trans>
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: t`Account` },
    },
  }
}
