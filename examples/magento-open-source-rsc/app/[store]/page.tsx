import type { Metadata } from 'next'
import { CmsPageContent } from '../../components/CmsPage'
import { CmsPageDocument } from '../../graphql/CmsPage.gql'
import { StoreConfigDocument } from '../../graphql/StoreConfig.gql'
import { getClient } from '../../lib/apollo/client'
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
  const client = getClient(storefront)

  // Fetch store config to get CMS home page identifier
  const { data: storeData } = await client.query({ query: StoreConfigDocument })
  const identifier = storeData?.storeConfig?.cms_home_page ?? 'home'

  // Fetch CMS page for meta information
  const { data: cmsData } = await client.query({
    query: CmsPageDocument,
    variables: { identifier },
  })

  const cmsPage = cmsData?.cmsPage

  return {
    title: cmsPage?.meta_title || cmsPage?.title || `Home - ${storefront.locale.toUpperCase()}`,
    description: cmsPage?.meta_description || 'GraphCommerce Magento Open Source with App Router',
  }
}

/**
 * Home page component (RSC) - Fetches CMS page data server-side Layout (header, footer, navigation)
 * is handled by layout.tsx
 */
export default async function HomePage({ params }: HomePageProps) {
  const { store } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  // Fetch store config to get CMS home page identifier
  const { data: storeData } = await client.query({ query: StoreConfigDocument })
  const identifier = storeData?.storeConfig?.cms_home_page ?? 'home'

  // Fetch CMS page content
  const { data: cmsData } = await client.query({
    query: CmsPageDocument,
    variables: { identifier },
  })

  const cmsPage = cmsData?.cmsPage

  if (!cmsPage) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1>Configure CMS Home Page</h1>
        <p>No CMS page found with identifier: {identifier}</p>
      </div>
    )
  }

  return <CmsPageContent content={cmsPage.content} contentHeading={cmsPage.content_heading} />
}
