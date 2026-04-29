import { getCategoryStaticPaths } from '@graphcommerce/magento-category/queries/getCategoryStaticPaths'
import {
  excludeSitemap,
  getServerSidePropsSitemap,
  staticPathsToString,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import { getStoryblokStaticPaths } from '@graphcommerce/storyblok-ui'
import type { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

const excludes = [
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
  '*/global/*',
]

const additionalPaths: string[] = ['']

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not found')

  // Magento categories live in their own sitemap, so exclude their URLs here.
  const excludeCategories = (
    await getCategoryStaticPaths(graphqlSsrClient(context), locale, { limit: false })
  ).map(staticPathsToString)

  const storyblokPaths = await getStoryblokStaticPaths(locale, {
    filterQuery: { meta_robots: { not_in: 'NOINDEX_NOFOLLOW' } },
  })

  const paths = [...additionalPaths, ...storyblokPaths]
    .map(staticPathsToString)
    .filter(excludeSitemap([...excludes, ...excludeCategories]))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
