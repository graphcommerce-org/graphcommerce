import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import Container from '@mui/material/Container'
import { GetStaticPaths } from 'next'
import {
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { PagesStaticPathsDocument } from '../../graphql/PagesStaticPaths.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ServicePage({ pages }: Props) {
  const title = pages?.[0].title ?? ''

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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = async (locale: string) => {
    const client = graphqlSharedClient(locale)
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

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const url = params?.url ? `service/${params?.url.join('/')}` : `service`
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({ query: DefaultPageDocument, variables: { url } })
  const layout = staticClient.query({ query: LayoutDocument })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  const isRoot = url === 'service'

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: isRoot ? null : { href: '/service', title: i18n._(/* i18n */ 'Customer Service') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
