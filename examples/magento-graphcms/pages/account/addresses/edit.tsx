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
  SheetShellHeader,
  Title,
} from '@graphcommerce/next-ui'
import { Box, Container, NoSsr } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

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
      <SheetShellHeader backFallbackTitle='Account' backFallbackHref='/account'>
        <Title size='small' component='span' icon={iconAddresses}>
          Addresses
        </Title>
      </SheetShellHeader>
      <Container maxWidth='md'>
        <PageMeta title='Edit address' metaDescription='Edit an address' metaRobots={['noindex']} />
        <NoSsr>
          <AppShellTitle icon={iconAddresses}>Addresses</AppShellTitle>

          <SectionContainer labelLeft='Edit address'>
            {!address && !loading && (
              <Box marginTop={3}>
                <IconHeader
                  src={iconAddresses}
                  title='Address not found'
                  alt='address'
                  size='small'
                />
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

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account/addresses',
}
EditAddressPage.pageOptions = pageOptions

export default EditAddressPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account/addresses',
      backFallbackTitle: 'Addresses',
    },
  }
}
