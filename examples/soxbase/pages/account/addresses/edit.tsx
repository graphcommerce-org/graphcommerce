import { useQuery } from '@apollo/client'
import { Box, Container, NoSsr } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  AccountDashboardAddressesDocument,
  ApolloCustomerErrorFullPage,
  EditAddressForm,
} from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { iconAddresses } from '@reachdigital/next-ui/icons'
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

  if (loading) return <></>
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <Container maxWidth='md'>
      <PageMeta title='Edit address' metaDescription='Edit an address' metaRobots={['noindex']} />
      <NoSsr>
        <IconHeader src={iconAddresses} title='Addresses' alt='addresses' size='large' />

        <SectionContainer label='Edit address'>
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
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account-addresses',
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
