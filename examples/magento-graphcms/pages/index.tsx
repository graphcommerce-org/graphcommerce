import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { GetStaticProps, LayoutHeader, MetaRobots, PageMeta } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { LayoutNavigation, LayoutNavigationProps, RowProduct, RowRenderer } from '../components'
import { LayoutDocument } from '../components/Layout/Layout.gql'

import { graphqlQuery, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery & {
  latestList: ProductListQuery
  favoritesList: ProductListQuery
  swipableList: ProductListQuery
}
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { pages, latestList, favoritesList, swipableList } = props
  const page = pages?.[0]

  const latest = latestList?.products?.items?.[0]
  const favorite = favoritesList?.products?.items?.[0]
  const swipable = swipableList?.products?.items?.[0]

  return (
    <>
      <PageMeta
        title={page?.metaTitle ?? page?.title ?? ''}
        metaDescription={page?.metaDescription ?? ''}
        metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      <LayoutHeader floatingMd floatingSm />

      {page && (
        <RowRenderer
          content={page.content}
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
                return (
                  <RowProduct {...rowProps} {...swipable} items={swipableList.products?.items} />
                )
              return (
                <RowProduct {...rowProps} {...favorite} items={favoritesList.products?.items} />
              )
            },
          }}
        />
      )}
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async () => {
  const pages = hygraphPageContent('page/home')

  const favoritesList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIx' } } },
  })

  const latestList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  const swipableList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIy' } } },
  })

  if (!(await pages).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await pages).data,
      ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
      latestList: (await latestList).data,
      favoritesList: (await favoritesList).data,
      swipableList: (await swipableList).data,
    },
    revalidate: 60 * 20,
  }
})
