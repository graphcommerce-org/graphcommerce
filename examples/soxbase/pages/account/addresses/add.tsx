import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import CreateCustomerAddressForm from '@reachdigital/magento-customer/CreateCustomerAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import OverlayPage from '../../../components/AppShell/OverlayPage'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

function AddNewAddressPage(props: Props) {
  const { countries } = props

  return (
    <OverlayPage
      title='Add address'
      variant='bottom'
      fullHeight
      backFallbackHref='/account/addresses'
      backFallbackTitle='Addresses'
    >
      <PageMeta title='Add address' metaDescription='Add new address' metaRobots={['noindex']} />
      <Container maxWidth='md'>
        <NoSsr>
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
    </OverlayPage>
  )
}

AddNewAddressPage.Layout = PageLayout
AddNewAddressPage.pageOptions = {
  overlay: 'bottom',
} as PageOptions

export default AddNewAddressPage

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
    },
  }
}
