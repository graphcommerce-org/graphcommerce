import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import { AccountDashboardAddressesDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardAddresses.gql'
import EditAddressForm from '@reachdigital/magento-customer/EditAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { useRouter } from 'next/router'
import React from 'react'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

function EditAddressPage(props: Props) {
  const { countries } = props
  const router = useRouter()
  const { addressId } = router.query

  const { data, loading } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
  })

  const numAddressId = Number(addressId)
  const addresses = data?.customer?.addresses
  const address = addresses?.filter((a) => a?.id === numAddressId)?.[0]

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta title='Addresses' metaDescription='Edit address' metaRobots='NOINDEX, FOLLOW' />
          <IconTitle
            iconSrc='/icons/desktop_addresses.svg'
            title='Addresses'
            alt='addresses'
            size='large'
          />

          <SectionContainer label='Edit address'>
            {!address && !loading && (
              <IconTitle
                iconSrc='/icons/desktop_addresses.svg'
                title='Address not found'
                alt='address'
                size='small'
              />
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
          </SectionContainer>
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

EditAddressPage.Layout = PageLayout

registerRouteUi('/account/addresses/edit', OverlayUi)

export default EditAddressPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  await config
  return {
    props: {
      ...(await countryRegions).data,
      apolloState: client.cache.extract(),
    },
  }
}
