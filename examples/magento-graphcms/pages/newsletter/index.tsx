import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { GuestNewsletter } from '@graphcommerce/magento-newsletter'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import {
  LayoutDocument,
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  productListRenderer,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = { content: PageContent }
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function NewsletterSubscribe(props: Props) {
  const { content } = props

  return (
    <>
      <PageMeta metadata={content.metadata} />
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={(theme) => ({
          '&.noAlign': { marginBottom: theme.spacings.sm },
          '& + .MuiContainer-root': {
            marginBottom: theme.spacings.sm,
          },
        })}
      >
        <LayoutTitle component='span' size='small'>
          {content.title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <ContentArea content={content} productListRenderer={productListRenderer} />

      <Container maxWidth={false}>
        <GuestNewsletter />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    sizeMd: 'floating',
    justifyMd: 'end',
    widthMd: '500px',
    sizeSm: 'floating',
  },
}
NewsletterSubscribe.pageOptions = pageOptions

export default NewsletterSubscribe

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const url = `newsletter`
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const content = pageContent(staticClient, url)
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  if ((await content).notFound) return { notFound: true }

  return {
    props: {
      content: await content,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
