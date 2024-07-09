import { PageOptions } from '@graphcommerce/framer-next-pages'
import { GuestOrderOverviewForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconBox,
  LayoutOverlayHeader,
  LayoutTitle,
  LayoutOverlayProps,
  LayoutOverlay,
} from '@graphcommerce/next-ui'
import { Trans, t } from '@lingui/macro'
import { Container } from '@mui/material'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountOrdersPage() {
  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Orders</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Orders`} metaRobots={['noindex']} />
        <LayoutTitle
          icon={iconBox}
          gutterBottom={false}
          sx={(theme) => ({ mb: theme.spacings.xxs })}
        >
          <Trans>Guest order status</Trans>
        </LayoutTitle>
        <GuestOrderOverviewForm />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'guest',
  sharedKey: () => 'guest/orders',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'bottom',
  },
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  if (import.meta.graphCommerce.magentoVersion < 247) return { notFound: true }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
