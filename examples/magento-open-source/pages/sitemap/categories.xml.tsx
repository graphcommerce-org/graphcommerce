import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import {
  excludeSitemap,
  staticPathsToString,
  getServerSidePropsSitemap,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { productListLink } from '@graphcommerce/magento-product'

const excludes: string[] = []
const additionalPaths: string[] = []

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not found')

  const client = graphqlSsrClient(context)
  const categoryRoutes = await getCategoryStaticPaths(client, locale, { limit: false })

  const categoryPaths = categoryRoutes
    .map(staticPathsToString)
    .map((url) => productListLink({ url, filters: {}, sort: {} }).slice(1))

  const paths = [...categoryPaths, ...additionalPaths]
    .map(staticPathsToString)
    .filter(excludeSitemap(excludes))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
