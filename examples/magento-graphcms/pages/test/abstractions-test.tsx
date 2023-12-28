import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery, parseHygraphContentItem } from '@graphcommerce/graphcms-ui'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  LayoutHeader,
  GetStaticProps,
  pageContent,
  RowProduct,
  RowRenderer,
} from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery & {
  latestList: ProductListQuery
  favoritesList: ProductListQuery
  swipableList: ProductListQuery
}
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

/**
 ** Todo: Update parser with Mike's code | Done
 ** Todo: Make parser functions for all other rows | Done
 ** Todo: Extend parser for unused rows in hygraph-ui package | Done
 ** Todo: Create generic types for all rows. | Done
 *
 *? Todo: Hook JSON content into regular pages through hookLocalContent plugin in the examples folder. | In Progress
 *
 *  Todo: JSONize all pages in Hygraph in the examples folder and inject with local plugins.
 *  Todo: Replace all images in content folder that point to graphassets for images from the public folder
 *
 *! Type errors on pages, parser and extendParser.
 */

function AbstractionsTest(props: Props) {
  const { pages, latestList, favoritesList, swipableList } = props
  const page = pages[0]
  const { content } = page

  const newContent = content.map((item) => parseHygraphContentItem(item)) // <-- expects BaseInput, but gets BaseInput + ExtendedInput

  const latest = latestList?.products?.items?.[0]
  const favorite = favoritesList?.products?.items?.[0]
  const swipable = swipableList?.products?.items?.[0]

  console.log(10, page)
  console.log(20, content)
  console.log(30, newContent)
  return (
    <>
      <LayoutHeader floatingMd floatingSm />
      <RowRenderer
        content={newContent}
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

AbstractionsTest.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default AbstractionsTest

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = pageContent('test/abstractions-test', staticClient)
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
