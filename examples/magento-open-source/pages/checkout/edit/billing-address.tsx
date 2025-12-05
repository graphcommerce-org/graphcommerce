import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { EditBillingAddressForm, getCheckoutIsDisabled } from '@graphcommerce/magento-cart'
import { getBillingAddressPermission } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutDocument, LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

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

      <LayoutTitle variant='h1'>
        <Trans>Billing address</Trans>
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
  if (
    getCheckoutIsDisabled(context.locale) ||
    getBillingAddressPermission(context.locale) === 'READONLY'
  ) {
    return { notFound: true }
  }

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
