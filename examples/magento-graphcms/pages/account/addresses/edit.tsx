import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ApolloCustomerErrorFullPage, EditAddressForm } from '@graphcommerce/magento-customer'
import { AccountDashboardAddressesDocument } from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconAddresses,
  IconHeader,
  SectionContainer,
  OverlayAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Box, Container, NoSsr } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useRouter } from 'next/router'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components/Layout/LayoutOverlay'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function EditAddressPage(props: Props) {
  const router = useRouter()
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
      <OverlayAppBar>
        <Title size='small' component='span' icon={iconAddresses}>
          <Trans>Addresses</Trans>
        </Title>
      </OverlayAppBar>
      <Container maxWidth='md'>
        <PageMeta
          title={t`Edit address`}
          metaDescription='Edit an address'
          metaRobots={['noindex']}
        />
        <NoSsr>
          <AppShellTitle icon={iconAddresses}>
            <Trans>Addresses</Trans>
          </AppShellTitle>

          <SectionContainer labelLeft={t`Edit address`}>
            {!address && !loading && (
              <Box marginTop={3}>
                <IconHeader src={iconAddresses} title={t`Address not found`} size='small' />
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
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
  sharedKey: () => 'account/addresses',
}
EditAddressPage.pageOptions = pageOptions

export default EditAddressPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      up: { href: '/account/addresses', title: 'Addresses' },
    },
  }
}
