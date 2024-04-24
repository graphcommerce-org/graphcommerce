import { getHygraphStaticPaths } from '@graphcommerce/graphcms-ui'
import { getCategoryStaticPaths } from '@graphcommerce/magento-category/queries/getCategoryStaticPaths'
import {
  excludeSitemap,
  staticPathsToString,
  getServerSidePropsSitemap,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

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
const additionalPaths = ['']

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not found')

  // Filter out category pages as they are already added in sitemap/categories.xml
  const excludeCategories = (
    await getCategoryStaticPaths(graphqlSsrClient(locale), locale, { limit: false })
  ).map(staticPathsToString)

  const hygraphPaths = await getHygraphStaticPaths(graphqlSsrClient(locale), locale, {
    filter: { metaRobots_not: 'NOINDEX_NOFOLLOW' },
  })

  const paths = [...additionalPaths, ...hygraphPaths]
    .map(staticPathsToString)
    .filter(excludeSitemap([...excludes, ...excludeCategories]))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
