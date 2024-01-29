import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutOverlay,
  LayoutOverlayProps,
  productListRenderer,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = { content: PageContent }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props, RouteProps>

function ModalPage(props: Props) {
  const { content } = props

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {content.title}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <PageMeta metadata={content.metadata} />
      <Box pt={4}>
        <LayoutTitle>{content.title}</LayoutTitle>
      </Box>

      <ContentArea content={content} productListRenderer={productListRenderer} />
    </>
  )
}

ModalPage.pageOptions = {
  Layout: LayoutOverlay,
  overlayGroup: 'modal',
} as PageOptions

export default ModalPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = [['modal']]

  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url.join('/') ?? '??'
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const content = pageContent(staticClient, `modal/${urlKey}`)
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  if ((await content).notFound) return { notFound: true }

  return {
    props: {
      content: await content,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
    },
    revalidate: 60 * 20,
  }
}
