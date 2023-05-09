import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  EditAddressForm,
  useCustomerQuery,
  WaitForCustomer,
  AccountDashboardAddressesDocument,
} from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  iconAddresses,
  IconHeader,
  SectionContainer,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { getLayout } from '../../../components/Layout/layout'

function EditAddressPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  const addresses = useCustomerQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const address = addresses.data?.customer?.addresses?.find(
    (a) => a?.id === Number(router.query.addressId),
  )

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Addresses' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Edit address')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          <LayoutTitle icon={iconAddresses}>
            <Trans id='Addresses' />
          </LayoutTitle>

          <SectionContainer labelLeft={<Trans id='Edit address' />}>
            {!address && (
              <Box marginTop={3}>
                <IconHeader src={iconAddresses} size='small'>
                  <Trans id='Address not found' />
                </IconHeader>
              </Box>
            )}

            {address && <EditAddressForm address={address} />}
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
  layoutProps: { variantMd: 'bottom' },
}
EditAddressPage.pageOptions = pageOptions

export default EditAddressPage

export const getStaticProps = enhanceStaticProps(getLayout, () => ({
  props: {
    up: { href: '/account/addresses', title: 'Addresses' },
  },
}))
