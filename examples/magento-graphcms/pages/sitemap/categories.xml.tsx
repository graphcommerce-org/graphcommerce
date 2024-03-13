import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import { canonicalize } from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, res, defaultLocale } = context

  if (!locale) throw Error('Locale not found')

  const options = { locale, defaultLocale, pathname: '/', isLocaleDomain: false }

  const paths = (await getCategoryStaticPaths(graphqlSsrClient(locale), locale)).map<ISitemapField>(
    (path) => {
      const loc = typeof path === 'string' ? path : path.params.url.join('/')
      return {
        loc: canonicalize(options, `/${loc}`) ?? '',
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
        priority: 0.8,
      }
    },
  )

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${60 * 60 * 2}, stale-while-revalidate=${60 * 60 * 24}`,
  )
  const result = getServerSideSitemapLegacy(context, paths)
  return result
}

export default function SitemapIndex() {}
