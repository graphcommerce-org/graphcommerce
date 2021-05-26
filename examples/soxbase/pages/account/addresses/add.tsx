import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CreateCustomerAddressForm } from '@reachdigital/magento-customer'
import { AccountDashboardAddressesQuery } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardAddresses.gql'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
  PageMeta,
  StoreConfigDocument,
} from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { iconAddresses } from '@reachdigital/next-ui/icons'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import MessageAuthRequired from '../../../components/MessageAuthRequired'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery & AccountDashboardAddressesQuery
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function AddNewAddressPage(props: Props) {
  const { countries, customer } = props

  if (!customer) return <MessageAuthRequired />

  return (
    <Container maxWidth='md'>
      <PageMeta title='Add address' metaDescription='Add new address' metaRobots={['noindex']} />
      <NoSsr>
        <IconHeader src={iconAddresses} title='Addresses' alt='addresses' size='large' />
        <SectionContainer label='Add new address'>
          <CreateCustomerAddressForm countries={countries} />
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
AddNewAddressPage.pageOptions = pageOptions

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
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account/addresses',
      backFallbackTitle: 'Addresses',
    },
  }
}
