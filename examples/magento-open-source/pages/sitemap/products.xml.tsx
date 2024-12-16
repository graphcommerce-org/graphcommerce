import {
  excludeSitemap,
  staticPathsToString,
  getServerSidePropsSitemap,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { getProductStaticPaths, productPath } from '@graphcommerce/magento-product'

const excludes: string[] = []
const additionalPaths: string[] = []

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not defined')

  const client = graphqlSsrClient(context)
  const productRoutes = await getProductStaticPaths(client, locale, { limit: false })

  const productPaths = productRoutes
    .map(staticPathsToString)
    .map((path) => productPath(path).slice(1))

  const paths = [...productPaths, ...additionalPaths].filter(excludeSitemap(excludes))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
