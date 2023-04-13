import { ProductListDocument } from '@graphcommerce/magento-product'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { Metadata } from 'next'
import { RowProduct, RowRenderer } from '../../../components'
import { DefaultPageDocument } from '../../../graphql/DefaultPage.gql'
import { apolloClient } from '../../../lib/graphql/graphqlRsc'
import { configFromProps } from '../../locale'
import { PageProps } from '../types'

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const config = configFromProps(props)
  const client = apolloClient(config.locale)
  const page = (await client.query({ query: DefaultPageDocument, variables: { url: `page/home` } }))
    .data.pages[0]

  return {
    title: page?.metaTitle ?? page?.title,
    description: page?.metaDescription,
  }
}

export default async function Page(props: PageProps) {
  const config = configFromProps(props)
  const client = apolloClient(config.locale)

  const [pagesList, favoritesList, latestList, swipableList] = await Promise.all([
    client.query({ query: DefaultPageDocument, variables: { url: `page/home` } }),
    client.query({
      query: ProductListDocument,
      variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIx' } } },
    }),
    client.query({
      query: ProductListDocument,
      variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIy' } } },
    }),
    client.query({
      query: ProductListDocument,
      variables: { pageSize: 8, filters: { category_uid: { eq: 'MTIy' } } },
    }),
  ])

  const page = pagesList.data?.pages?.[0]
  const latest = latestList.data?.products?.items?.[0]
  const favorite = favoritesList.data?.products?.items?.[0]
  const swipable = swipableList.data?.products?.items?.[0]

  return (
    <>
      <LayoutHeader floatingMd floatingSm />

      {page && (
        <RowRenderer
          content={page.content}
          renderer={{
            RowProduct: (rowProps) => {
              const { identity } = rowProps

              if (identity === 'home-favorites')
                return (
                  <RowProduct
                    {...rowProps}
                    {...favorite}
                    items={favoritesList.data.products?.items}
                  />
                )
              if (identity === 'home-latest')
                return (
                  <RowProduct {...rowProps} {...latest} items={latestList.data.products?.items} />
                )
              if (identity === 'home-swipable')
                return (
                  <RowProduct
                    {...rowProps}
                    {...swipable}
                    items={swipableList.data.products?.items}
                  />
                )
              return (
                <RowProduct
                  {...rowProps}
                  {...favorite}
                  items={{ ...favoritesList.data.products?.items }}
                />
              )
            },
          }}
        />
      )}
    </>
  )
}
