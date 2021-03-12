import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import CreateCustomerAddressForm from '@reachdigital/magento-customer/CreateCustomerAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

function AddNewAddressPage(props: Props) {
  const { countries } = props

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta
            title='Addresses'
            metaDescription='Add new address'
            metaRobots='NOINDEX, FOLLOW'
          />
          <IconTitle
            iconSrc='/icons/desktop_addresses.svg'
            title='Addresses'
            alt='addresses'
            size='large'
          />
          <SectionContainer label='Add new address'>
            <CreateCustomerAddressForm countries={countries} />
          </SectionContainer>
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AddNewAddressPage.Layout = PageLayout

registerRouteUi('/account/addresses/add', OverlayUi)

export default AddNewAddressPage

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
