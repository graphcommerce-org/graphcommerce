import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountDashboardAddressesDocument,
  EditAddressForm,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconAddresses,
  IconHeader,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Container } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function EditAddressPage() {
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
          <Trans>Addresses</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Edit address`} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          <LayoutTitle icon={iconAddresses}>
            <Trans>Addresses</Trans>
          </LayoutTitle>

          <SectionContainer labelLeft={<Trans>Edit address</Trans>}>
            {!address && (
              <Box sx={{ marginTop: 3 }}>
                <IconHeader src={iconAddresses} size='small'>
                  <Trans>Address not found</Trans>
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
}
EditAddressPage.pageOptions = pageOptions

export default EditAddressPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/addresses', title: t`Addresses` },
    },
  }
}
