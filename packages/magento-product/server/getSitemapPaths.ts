import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { canonicalize, nonNullable } from '@graphcommerce/next-ui'
import { productLink } from '../hooks/useProductLink'
import { ProductStaticPathsDocument } from './ProductStaticPaths.gql'

export async function getSitemapPaths(
  ctx: { locale?: string; defaultLocale?: string },
  pageSize: number,
) {
  const { locale, defaultLocale } = ctx
  const query = ProductStaticPathsDocument

  const pageInfo = graphqlQuery(ProductStaticPathsDocument, {
    variables: { currentPage: 1, pageSize },
  })
  const total = (await pageInfo).data.products?.page_info?.total_pages || 0

  const result = Array.from(Array(total).keys()).map(async (currentPage) => {
    const res = await graphqlQuery(ProductStaticPathsDocument, {
      variables: { currentPage: currentPage + 1, pageSize },
    })
    return res.data.products?.items
  })

  const options = { locale, defaultLocale, pathname: '/', isLocaleDomain: false }
  const lastmod = new Date().toISOString()
  const changefreq = 'daily' as const
  const priority = 0.7

  const paths = (await Promise.all(result))
    .flat(1)
    .map((urlKey) => (urlKey ? canonicalize(options, productLink(urlKey)) : undefined))
    .filter(nonNullable)
    .map((loc) => ({ loc, lastmod, changefreq, priority }))
  return paths
}
