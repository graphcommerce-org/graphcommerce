import { setConfigContext } from '@graphcommerce/next-ui/server'
import type { LayoutProps } from '../../../.next/types/app/[storefront]/(full)/layout'
import { LayoutNavigation } from '../../../components/Layout'
import { getLayout } from '../../../components/Layout/layout'

export function generateStaticParams() {
  return import.meta.graphCommerce.storefront.map((storefront) => ({
    storefront: storefront.locale,
  }))
}

export default async (props: LayoutProps) => {
  setConfigContext(props)
  const { children } = props
  return <LayoutNavigation {...(await getLayout()).props}>{children}</LayoutNavigation>
}
