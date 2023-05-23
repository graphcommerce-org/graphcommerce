import { getHygraphPage } from '@graphcommerce/graphcms-ui/server'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { setConfigContext } from '@graphcommerce/next-ui/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RowProduct, RowRenderer } from '../../../components'
import { RowRendererServer } from '../../../components/GraphCMS/RowRendererServer'
import { PageProps } from '../types'

export const generateMetadata = async (props) => {
  setConfigContext(props)
  const page = await getHygraphPage('page/home').page

  return {
    title: page?.metaTitle ?? page?.title,
    description: page?.metaDescription,
  } satisfies Metadata
}

export default async (props: PageProps) => {
  setConfigContext(props)
  const hygraphPage = getHygraphPage('page/home')

  const favoritesList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIx' } } },
  })
  const latestList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIy' } } },
  })
  const swipableList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIy' } } },
  })

  const latest = latestList.then((r) => r.data?.products?.items)
  const favorite = favoritesList.then((r) => r.data?.products?.items)
  const swipable = swipableList.then((r) => r.data?.products?.items)

  const page = await hygraphPage.page
  if (!page) notFound()

  return (
    <>
      <LayoutHeader floatingMd floatingSm />

      {page && (
        <RowRenderer
          {...page}
          // renderer={{
          //   RowProduct: async (rowProps) => {
          //     const { identity } = rowProps
          //     if (identity === 'home-latest')
          //       return <RowProduct {...rowProps} {...await latest[0]} items={await latest} />
          //     if (identity === 'home-swipable')
          //       return <RowProduct {...rowProps} {...await swipable[0]} items={await swipable} />
          //     return <RowProduct {...rowProps} {...await favorite[0]} items={await favorite} />
          //   },
          // }}
        />
      )}
    </>
  )
}
