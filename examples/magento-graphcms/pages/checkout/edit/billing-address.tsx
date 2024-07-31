import { getCheckoutIsDisabled } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { EditBillingAddressForm } from '@graphcommerce/magento-cart-billing-address'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutDocument, LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function EditBillingAddress() {
  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Edit billing address')}
        metaRobots={['noindex', 'nofollow']}
      />

      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          <Trans id='Billing address' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle variant='h1'>
        <Trans id='Billing address' />
      </LayoutTitle>

      <Container maxWidth='md'>
        <EditBillingAddressForm />
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'left',
    },
  }
}
