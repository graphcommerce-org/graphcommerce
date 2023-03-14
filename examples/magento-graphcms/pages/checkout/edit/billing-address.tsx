import { PageOptions } from '@graphcommerce/framer-next-pages'
import { EditBillingAddressForm } from '@graphcommerce/magento-cart-billing-address'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import Container from '@mui/material/Container'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { LayoutDocument } from '../../../components/Layout/Layout.gql'
import { DefaultPageDocument } from '../../../graphql/DefaultPage.gql'
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(locale)

  const page = staticClient.query({ query: DefaultPageDocument, variables: { url: `checkout` } })
  const layout = staticClient.query({ query: LayoutDocument })

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'left',
    },
  }
}
