import type { Metadata } from 'next'
import { Providers } from '../../components/Providers'
import { LayoutDocument } from '../../graphql/Layout.gql'
import { getClient } from '../../lib/apollo/client'
import { generateStoreParams, getStorefrontConfig } from '../../lib/storefront'

type StoreLayoutProps = {
  children: React.ReactNode
  overlay: React.ReactNode
  params: Promise<{ store: string }>
}

/** Generate static params for all storefronts This enables static generation for all store locales */
export function generateStaticParams() {
  return generateStoreParams()
}

/** Generate metadata based on the store */
export async function generateMetadata({ params }: StoreLayoutProps): Promise<Metadata> {
  const { store } = await params
  const storefront = getStorefrontConfig(store)

  return {
    title: {
      template: '%s | GraphCommerce',
      default: 'GraphCommerce',
    },
    other: {
      locale: storefront.linguiLocale ?? storefront.locale,
    },
  }
}

/**
 * Store layout with client providers (MUI, Framer, Lingui, Apollo) The Providers component is a
 * client component that wraps all context providers
 *
 * The `overlay` slot is a parallel route for displaying overlays (modals, sheets) See:
 * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 */
export default async function StoreLayout({ children, overlay, params }: StoreLayoutProps) {
  const { store } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  // Fetch layout data (menu and cms blocks) server-side
  const { data: layoutData } = await client.query({ query: LayoutDocument })

  return (
    <Providers storefront={storefront} layoutData={layoutData}>
      {children}
      {overlay}
    </Providers>
  )
}
