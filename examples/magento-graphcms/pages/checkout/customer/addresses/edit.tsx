import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage, EditAddressForm } from '@graphcommerce/magento-customer'
import { AccountDashboardAddressesDocument } from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconAddresses,
  IconHeader,
  SectionContainer,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, NoSsr, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../../components'
import { graphqlSharedClient } from '../../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function CheckoutCustomerAddressesEdit() {
  const router = useRouter()
  useGoogleRecaptcha()

  const { addressId } = router.query

  const { data, loading, error } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })

  const numAddressId = Number(addressId)
  const addresses = data?.customer?.addresses
  const address = addresses?.find((a) => a?.id === numAddressId)

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
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Edit address' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta
          title={i18n._(/* i18n */ `Edit address`)}
          metaDescription='Edit an address'
          metaRobots={['noindex']}
        />
        <NoSsr>
          <LayoutTitle icon={iconAddresses}>
            <Trans id='Edit address' />
          </LayoutTitle>

          <SectionContainer labelLeft={i18n._(/* i18n */ `Edit address`)}>
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

            {address && !loading && (
              <EditAddressForm onCompleteRoute='/checkout' address={address} />
            )}
          </SectionContainer>
        </NoSsr>
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
      up: { href: '/checkout', title: 'Checkout' },
    },
  }
}
