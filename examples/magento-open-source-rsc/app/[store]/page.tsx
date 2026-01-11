import type { Metadata } from 'next'
import { generateStoreParams, getStorefrontConfig } from '../../lib/storefront'

type HomePageProps = {
  params: Promise<{ store: string }>
}

/** Generate static params for all storefronts */
export function generateStaticParams() {
  return generateStoreParams()
}

/** Generate metadata for the home page */
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { store } = await params
  const storefront = getStorefrontConfig(store)

  return {
    title: `Home - ${storefront.locale.toUpperCase()}`,
    description: 'GraphCommerce Magento Open Source with App Router',
  }
}

/**
 * Home page component (RSC) This is a blank page that demonstrates the architecture is working Uses
 * plain HTML/CSS to avoid importing packages with next/router dependencies
 */
export default async function HomePage({ params }: HomePageProps) {
  const { store } = await params
  const storefront = getStorefrontConfig(store)

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
          GraphCommerce RSC
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
          App Router with React Server Components
        </h2>
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            display: 'inline-block',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Store:</strong> {store}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Magento Store Code:</strong> {storefront.magentoStoreCode}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Locale:</strong> {storefront.linguiLocale ?? storefront.locale}
          </p>
        </div>
        <p style={{ marginTop: '2rem', color: '#888', fontSize: '0.875rem' }}>
          This blank page confirms that the App Router architecture is working correctly.
        </p>
      </div>
    </div>
  )
}
