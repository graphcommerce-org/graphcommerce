import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  LayoutHeader,
  GetStaticProps,
  MetaRobots,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { LayoutFullProps, RowRenderer, RowProduct, LayoutFull } from '../../components'
import { DefaultPageQuery, DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & ProductListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
export type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function CmsPage(props: Props) {
  const router = useRouter()
  const { pages, products } = props
  const page = pages?.[0]

  const title = page?.title ?? ''

  const product = products?.items?.[0]
  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  return (
    <>
      <PageMeta
        title={page?.metaTitle ?? title ?? ''}
        metaDescription={page?.metaDescription ?? ''}
        metaRobots={metaRobots}
        canonical={`/${page?.url}`}
      />

      <LayoutHeader floatingMd floatingSm>
        {router.pathname.split('?')[0] !== '/' && (
          <LayoutTitle component='span' size='small'>
            {title}
          </LayoutTitle>
        )}
      </LayoutHeader>

      {router.pathname !== '/' && <LayoutTitle variant='h1'>{title}</LayoutTitle>}

      {pages?.[0] && (
        <RowRenderer
          content={pages?.[0].content}
          renderer={{
            RowProduct: (rowProps) => (
              <RowProduct {...rowProps} {...product} items={products?.items} />
            ),
          }}
        />
      )}
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['home', 'no-route']

  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `page/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const categoryUid = String((await conf).data.storeConfig?.root_category_uid ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { categoryUid, pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  return {
    props: {
      ...(await page).data,
      ...(await productList).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
