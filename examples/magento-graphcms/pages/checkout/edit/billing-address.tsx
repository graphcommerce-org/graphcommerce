import { PageOptions } from '@graphcommerce/framer-next-pages'
import { EditBillingAddressForm } from '@graphcommerce/magento-cart-billing-address'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { DefaultPageDocument } from '../../../components/GraphQL/DefaultPage.gql'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components/Layout/LayoutOverlay'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function EditBillingAddress() {
  return (
    <>
      <PageMeta title={t`Edit billing address`} metaRobots={['noindex', 'nofollow']} />

      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          <Trans>Billing address</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle>
        <LayoutTitle>
          <Trans>Billing address</Trans>
        </LayoutTitle>
      </LayoutTitle>

      <Container maxWidth='md'>
        <NoSsr>
          <EditBillingAddressForm />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
EditBillingAddress.pageOptions = pageOptions

export default EditBillingAddress

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = apolloClient(locale)

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      ...(await page).data,
      variant: 'left',
    },
  }
}
