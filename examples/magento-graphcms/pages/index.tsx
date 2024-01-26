import {
  ContentAreaHome,
  PageContent,
  UniversalPageDocument,
  UniversalPageQuery,
} from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { RowProduct } from '@graphcommerce/graphcms-ui'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader, PageMeta } from '@graphcommerce/next-ui'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  productListRenderer,
} from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = {
  latestList: ProductListQuery
  favoritesList: ProductListQuery
  swipableList: ProductListQuery
} & UniversalPageQuery

type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { pageContent, latestList, favoritesList, swipableList } = props

  const latest = latestList?.products?.items?.[0]
  const favorite = favoritesList?.products?.items?.[0]
  const swipable = swipableList?.products?.items?.[0]

  return (
    <>
      {/* <PageMeta metadata={content.metadata} canonical='/' /> */}

      <LayoutHeader floatingMd floatingSm />

      <ContentAreaHome
        pageContent={pageContent}
        productListRenderer={productListRenderer}
        // renderer={{
        //   RowProduct: (rowProps) => {
        //     const { identity } = rowProps

        //     if (identity === 'home-favorites')
        //       return (
        //         <RowProduct {...rowProps} {...favorite} items={favoritesList.products?.items} />
        //       )
        //     if (identity === 'home-latest')
        //       return <RowProduct {...rowProps} {...latest} items={latestList.products?.items} />
        //     if (identity === 'home-swipable')
        //       return <RowProduct {...rowProps} {...swipable} items={swipableList.products?.items} />
        //     return <RowProduct {...rowProps} {...favorite} items={favoritesList.products?.items} />
        //   },
        // }}
      />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = client.query({
    query: UniversalPageDocument,
    variables: { input: { url: 'page/home' } },
  })

  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const favoritesList = staticClient.query({
    query: ProductListDocument,
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIx' } } },
  })

  const latestList = staticClient.query({
    query: ProductListDocument,
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  const swipableList = staticClient.query({
    query: ProductListDocument,
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIy' } } },
  })

  if (!(await page).data) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      latestList: (await latestList).data,
      favoritesList: (await favoritesList).data,
      swipableList: (await swipableList).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
