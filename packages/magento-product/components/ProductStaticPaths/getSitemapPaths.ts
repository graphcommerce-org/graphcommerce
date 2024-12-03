import type { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { canonicalize, nonNullable } from '@graphcommerce/next-ui'
import { productLink } from '../../hooks/useProductLink'
import { ProductStaticPathsDocument } from './ProductStaticPaths.gql'

/**
 * @deprecated Not used anymore, use `getProductStaticPaths` instead.
 */
export async function getSitemapPaths(
  client: ApolloClient<NormalizedCacheObject>,
  ctx: { locale?: string; defaultLocale?: string },
  pageSize: number,
) {
  const { locale, defaultLocale } = ctx
  const query = ProductStaticPathsDocument

  const pageInfo = client.query({ query, variables: { currentPage: 1, pageSize } })
  const total = (await pageInfo).data.products?.page_info?.total_pages || 0

  const result = Array.from(Array(total).keys()).map(async (currentPage) => {
    const res = await client.query({ query, variables: { currentPage: currentPage + 1, pageSize } })
    return res.data.products?.items
  })

  const options = { locale, defaultLocale, pathname: '/', isLocaleDomain: false }
  const lastmod = new Date().toISOString()
  const changefreq = 'daily'
  const priority = 0.7

  const paths = (await Promise.all(result))
    .flat(1)
    .map((urlKey) => (urlKey ? canonicalize(options, productLink(urlKey)) : undefined))
    .filter(nonNullable)
    .map((loc) => ({ loc, lastmod, changefreq, priority }))
  return paths
}
