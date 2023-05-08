import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CreateCustomerAddressForm,
  CustomerDocument,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  SectionContainer,
  iconAddresses,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'

function AddNewAddressPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const addresses = useCustomerQuery(CustomerDocument, { fetchPolicy: 'cache-and-network' })

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Addresses' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Add address')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          <LayoutTitle icon={iconAddresses}>
            <Trans id='Addresses' />
          </LayoutTitle>
          <SectionContainer labelLeft={<Trans id='Add new address' />}>
            <CreateCustomerAddressForm />
          </SectionContainer>
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
  sharedKey: () => 'account/addresses',
  layoutProps: { variantMd: 'bottom', sizeMd: 'full', sizeSm: 'full' },
}
AddNewAddressPage.pageOptions = pageOptions

export default AddNewAddressPage

export const getStaticProps = enhanceStaticProps<LayoutOverlayProps>(() => ({
  props: {
    up: { href: '/account', title: 'Account' },
  },
}))
