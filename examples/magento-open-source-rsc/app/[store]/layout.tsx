import type { Metadata } from 'next'
import { generateStoreParams, getStorefrontConfig } from '../../lib/storefront'

type StoreLayoutProps = {
  children: React.ReactNode
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
 * Store layout - minimal RSC version For now, renders children directly without client providers to
 * avoid importing packages that use next/router
 */
export default async function StoreLayout({ children, params }: StoreLayoutProps) {
  const { store } = await params
  // Verify the store exists (will throw notFound if invalid)
  getStorefrontConfig(store)

  return <>{children}</>
}
