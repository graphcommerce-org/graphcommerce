import type { Metadata } from 'next'
import { Providers } from '../../components/Providers'
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
 * Store layout with client providers (MUI, Framer, Lingui, Apollo) The Providers component is a
 * client component that wraps all context providers
 */
export default async function StoreLayout({ children, params }: StoreLayoutProps) {
  const { store } = await params
  const storefront = getStorefrontConfig(store)

  return <Providers storefront={storefront}>{children}</Providers>
}
