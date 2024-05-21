import { getProductStaticPaths } from '@graphcommerce/magento-product'
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

  if (!locale) throw Error('Locale not defined')

  const productPaths = await getProductStaticPaths(graphqlSsrClient(locale), locale, {
    limit: false,
  })

  const paths = [...productPaths, ...additionalPaths]
    .map(staticPathsToString)
    .filter(excludeSitemap(excludes))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
