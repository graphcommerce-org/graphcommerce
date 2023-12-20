import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery, parseHygraph } from '@graphcommerce/graphcms-ui'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  LayoutHeader,
  GetStaticProps,
  rowLinksInput,
  rowColumnOneInput,
  rowQuoteInput,
  pageContent,
} from '@graphcommerce/next-ui'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'

type Props = HygraphPagesQuery & {
  latestList: ProductListQuery
  favoritesList: ProductListQuery
  swipableList: ProductListQuery
}
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function AbstractionsTest(props: Props) {
  console.log(props)
  const { pages, latestList, favoritesList, swipableList } = props
  const page = pages[0]
  const { content } = page

  const newContent = [rowColumnOneInput, rowLinksInput, rowQuoteInput].map((item) =>
    parseHygraph(item),
  )

  const latest = latestList?.products?.items?.[0]
  const favorite = favoritesList?.products?.items?.[0]
  const swipable = swipableList?.products?.items?.[0]

  console.log(20, content)

  return (
    <>
      <LayoutHeader floatingMd floatingSm />
      <RowRenderer
        content={newContent}
        renderer={{
          RowProduct: (rowProps) => {
            const { identity } = rowProps

            if (identity === 'home-favorites')
              return (
                <RowProduct {...rowProps} {...favorite} items={favoritesList.products?.items} />
              )
            if (identity === 'home-latest')
              return <RowProduct {...rowProps} {...latest} items={latestList.products?.items} />
            if (identity === 'home-swipable')
              return <RowProduct {...rowProps} {...swipable} items={swipableList.products?.items} />
            return <RowProduct {...rowProps} {...favorite} items={favoritesList.products?.items} />
          },
        }}
      />
    </>
  )
}

AbstractionsTest.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default AbstractionsTest

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = pageContent('test/abstractions-test', staticClient) // Actually a client should be also sent?
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  if (!(await page).data.pages?.[0]) return { notFound: true }

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
