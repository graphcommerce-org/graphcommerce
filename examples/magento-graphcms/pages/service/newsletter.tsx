import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/hygraph-ui'
import { GuestNewsletter } from '@graphcommerce/magento-newsletter'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import {
  LayoutDocument,
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function NewsletterSubscribe({ pages }: Props) {
  const page = pages?.[0]
  const title = page.title ?? ''

  return (
    <>
      <PageMeta
        title={title}
        metaDescription={title}
        canonical={pages?.[0]?.url ? `/${pages[0].url}` : undefined}
      />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{title}</LayoutTitle>
      </Container>

      <RowRenderer {...pages[0]} />

      <Container maxWidth='md'>
        {page?.title && (
          <Typography variant='h3'>
            <Trans id='Subscribe to newsletter'>Subscribe to newsletter</Trans>
          </Typography>
        )}
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
  const url = 'service/newsletter'
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const page = hygraphPageContent(staticClient, url)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: { href: '/service', title: t`Customer Service` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
