import { useQuery } from '@apollo/client'
import { Box, Container, NoSsr } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  DeleteCustomerAddressForm,
  EditAddressForm,
  AccountDashboardAddressesDocument,
} from '@reachdigital/magento-customer'

import {
  PageMeta,
  StoreConfigDocument,
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { iconAddresses } from '@reachdigital/next-ui/icons'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function EditAddressPage(props: Props) {
  const { countries } = props
  const router = usePageRouter()
  const { addressId } = router.query

  const { data, loading } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })

  const numAddressId = Number(addressId)
  const addresses = data?.customer?.addresses
  const address = addresses?.filter((a) => a?.id === numAddressId)?.[0]

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

          {address && !loading && <EditAddressForm countries={countries} address={address} />}

          {address && !loading && (
            <DeleteCustomerAddressForm addressId={address?.id ?? undefined} />
          )}
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

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account/addresses',
      backFallbackTitle: 'Addresses',
    },
  }
}
