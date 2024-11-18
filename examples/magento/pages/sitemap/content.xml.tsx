import {
  excludeSitemap,
  staticPathsToString,
  getServerSidePropsSitemap,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

const excludes: string[] = [
  '*/p/*',
  '*/account*',
  '*/wishlist*',
  '*/cart*',
  '*/checkout*',
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

  const paths = additionalPaths.map(staticPathsToString).filter(excludeSitemap(excludes))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() {}
