import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { GuestNewsletter } from '@graphcommerce/magento-newsletter'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import type { LayoutNavigationProps, LayoutOverlayProps } from '../../components'
import { LayoutDocument, LayoutOverlay } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function NewsletterSubscribe(props: Props) {
  const title = t`Newsletter`

  return (
    <>
      <PageMeta title={title} />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{title}</LayoutTitle>
      </Container>

      <Container maxWidth='md'>
        <Typography variant='h3'>
          <Trans>Subscribe to newsletter</Trans>
        </Typography>
        <GuestNewsletter />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
NewsletterSubscribe.pageOptions = pageOptions

export default NewsletterSubscribe

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/service', title: t`Customer Service` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
