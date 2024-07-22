import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PagesStaticPathsDocument } from '@graphcommerce/graphcms-ui'
import { StoreConfigDocument, redirectOrNotFound } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  productListRenderer,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { cacheFirst } from '@graphcommerce/graphql'

type Props = { content: PageContent }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ServicePage(props: Props) {
  const { content } = props

  return (
    <>
      <PageMeta metadata={content.metadata} />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {content.title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{content.title}</LayoutTitle>
      </Container>

      <ContentArea content={content} productListRenderer={productListRenderer} />
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
ServicePage.pageOptions = pageOptions

export default ServicePage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = async (locale: string) => {
    const client = graphqlSsrClient({ locale })
    const { data } = await client.query({
      query: PagesStaticPathsDocument,
      variables: {
        first: import.meta.graphCommerce.limitSsg ? 1 : 1000,
        urlStartsWith: 'service',
      },
    })
    return data.pages.map((page) => ({ params: { url: page.url.split('/').slice(1) }, locale }))
  }
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const url = params?.url ? `service/${params?.url.join('/')}` : `service`
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const content = pageContent(staticClient, url)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  if ((await content).notFound) return redirectOrNotFound(staticClient, conf, { url }, locale)

  const isRoot = url === 'service'

  return {
    props: {
      content: await content,
      ...(await layout).data,
      up: isRoot ? null : { href: '/service', title: i18n._(/* i18n */ 'Customer Service') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
