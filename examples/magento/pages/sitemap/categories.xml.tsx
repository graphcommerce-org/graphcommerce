import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import {
  excludeSitemap,
  staticPathsToString,
  getServerSidePropsSitemap,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

const excludes = []
const additionalPaths = []

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not found')

  const categoryPaths = await getCategoryStaticPaths(graphqlSsrClient(context), locale, {
    limit: false,
  })

  const paths = [...categoryPaths, ...additionalPaths]
    .map(staticPathsToString)
    .filter(excludeSitemap(excludes))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
