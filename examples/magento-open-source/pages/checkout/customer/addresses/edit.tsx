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
  iconAddresses,
  IconHeader,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, CircularProgress, Container, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../../components'
import { LayoutOverlay } from '../../../../components'
import { graphqlSharedClient } from '../../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function CheckoutCustomerAddressesEdit() {
  const router = useRouter()
  const { data, loading, error } = useCustomerQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const address = data?.customer?.addresses?.find((a) => a?.id === Number(router.query.addressId))

  if (loading)
    return (
      <FullPageMessage icon={<CircularProgress />} title={<Trans>Loading your account</Trans>}>
        <Trans>This may take a second</Trans>
      </FullPageMessage>
    )
  if (error) return <ApolloCustomerErrorFullPage error={error} />

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans>Edit address</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Edit address`} metaRobots={['noindex']} />

        <LayoutTitle icon={iconAddresses}>
          <Trans>Edit address</Trans>
        </LayoutTitle>

        <SectionContainer labelLeft={<Trans>Edit address</Trans>}>
          {!address && !loading && (
            <Box sx={{ marginTop: 3 }}>
              <IconHeader src={iconAddresses} size='small'>
                <Trans>Address not found</Trans>
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
      up: { href: '/checkout', title: t`Shipping` },
    },
  }
}
