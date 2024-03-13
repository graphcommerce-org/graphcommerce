import { getHygraphStaticPaths } from '@graphcommerce/graphcms-ui'
import { getCategoryStaticPaths } from '@graphcommerce/magento-category/queries/getCategoryStaticPaths'
import { canonicalize } from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { isMatch } from '../../lib/sitemap/matcher'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, res, defaultLocale } = context

  if (!locale) throw Error('Locale not found')

  const additionalPaths = ['']
  const excludes = [
    '*page/home',
    '*/p/*',
    '*/product/global',
    '*/product*',
    '*/account*',
    '*/wishlist*',
    '*/cart*',
    '*/modal*',
    '*/checkout*',
    '*/test/*',
    '/test/*',
    '*/404',
    '*/no-route',
    '*/home',
    '*/switch-stores',
    '*/search',
    '*/account',
    '*/wishlist',
    '*/cart',
    '*/checkout',
  ]

  // Filter out category pages as they are already added in sitemap/categories.xml
  excludes.push(
    ...(await getCategoryStaticPaths(graphqlSsrClient(locale), locale)).map(
      (path) => `/${typeof path === 'string' ? path : path.params.url.join('/')}`,
    ),
  )

  const options = { locale, defaultLocale, pathname: '/', isLocaleDomain: false }

  const paths = [
    ...additionalPaths,
    ...(await getHygraphStaticPaths(graphqlSsrClient(locale), locale, {
      filter: { metaRobots_not: 'NOINDEX_NOFOLLOW' },
    })),
  ]
    .filter((path) => !isMatch(`/${typeof path === 'string' ? path : path.params.url}`, excludes))
    .map<ISitemapField>((path) => {
      const loc = typeof path === 'string' ? path : path.params.url
      return {
        loc: canonicalize(options, `/${loc}`) ?? '',
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
        priority: 0.7,
      }
    })

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${60 * 60 * 2}, stale-while-revalidate=${60 * 60 * 24}`,
  )
  const result = getServerSideSitemapLegacy(context, paths)
  return result
}

export default function SitemapIndex() {}
