import { AnimatePresence } from 'framer-motion'
import type { LayoutProps } from '../../../.next/types/app/[storefront]/(full)/layout'
import { LayoutNavigation } from '../../../components/Layout'
import { LayoutDocument } from '../../../components/Layout/Layout.gql'
import { apolloClient } from '../../../lib/graphql/graphqlRsc'
import { configFromProps } from '../../locale'

export function generateStaticParams() {
  return import.meta.graphCommerce.storefront.map((storefront) => ({
    storefront: storefront.locale,
  }))
}

export default async function RootLayout(props: LayoutProps) {
  const { children } = props

  const client = apolloClient(configFromProps(props).locale)
  const result = await client.query({ query: LayoutDocument })
  return <LayoutNavigation {...result.data}>{children}</LayoutNavigation>
}
