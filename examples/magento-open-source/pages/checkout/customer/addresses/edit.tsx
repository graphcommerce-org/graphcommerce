import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { getCartDisabled } from '@graphcommerce/magento-cart'
import {
  AccountDashboardAddressesDocument,
  ApolloCustomerErrorFullPage,
  EditAddressForm,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  IconHeader,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
  iconAddresses,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../../components'
import { LayoutOverlay } from '../../../../components'
import { graphqlSharedClient } from '../../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function CheckoutCustomerAddressesEdit() {
  const router = useRouter()
  const { data, loading, error, called } = useCustomerQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const address = data?.customer?.addresses?.find((a) => a?.id === Number(router.query.addressId))

  if (loading || !called)
    return (
      <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading your account' />}>
        <Trans id='This may take a second' />
      </FullPageMessage>
    )
  if (error) return <ApolloCustomerErrorFullPage error={error} />

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Edit address' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Edit address')} metaRobots={['noindex']} />

        <LayoutTitle icon={iconAddresses}>
          <Trans id='Edit address' />
        </LayoutTitle>

        <SectionContainer labelLeft={<Trans id='Edit address' />}>
          {!address && !loading && (
            <Box marginTop={3}>
              <IconHeader src={iconAddresses} size='small'>
                <Trans id='Address not found' />
              </IconHeader>
            </Box>
          )}

          {loading && (
            <div>
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
            </div>
          )}

          {address && !loading && <EditAddressForm address={address} />}
        </SectionContainer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'checkout',
  Layout: LayoutOverlay,
}
CheckoutCustomerAddressesEdit.pageOptions = pageOptions

export default CheckoutCustomerAddressesEdit

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCartDisabled(context.locale) || getCustomerAccountIsDisabled(context.locale))
    return { notFound: true }
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/checkout', title: i18n._(/* i18n */ 'Shipping') },
    },
  }
}
