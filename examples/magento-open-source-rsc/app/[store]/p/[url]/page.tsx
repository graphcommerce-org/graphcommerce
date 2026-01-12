import { defaultConfigurableOptionsSelection } from '@graphcommerce/magento-product-configurable'
import { StoreConfigDocument } from '@graphcommerce/magento-store/server'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { revalidate as getRevalidateTime } from '@graphcommerce/next-ui/server'
import type { Metadata } from 'next'
import { ProductPage2Document } from '../../../../graphql/ProductPage2.gql'
import { getClient } from '../../../../lib/apollo/client'
import { redirectOrNotFound } from '../../../../lib/redirectOrNotFound'
import { serialize } from '../../../../lib/serialize'
import { getStorefrontConfig } from '../../../../lib/storefront'
import { ProductClient } from './ProductClient'

/** Enable ISR for product pages, matching Pages Router getStaticProps + revalidate behavior */
export const revalidate = getRevalidateTime()

type ProductPageProps = {
  params: Promise<{ store: string; url: string }>
}

/** Generate metadata for the product page */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const { data } = await client.query({
    query: ProductPage2Document,
    variables: { urlKey: url, useCustomAttributes: magentoVersion >= 247 },
  })

  const product = data?.products?.items?.[0]

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.short_description?.html || undefined,
    keywords: product.meta_keyword || undefined,
  }
}

/**
 * Product page (RSC) - Fetches product data server-side and passes to ProductClient for rendering.
 *
 * Following the migration plan: Page is RSC that inlines getStaticProps, renders via client
 * component.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const storeConfigQuery = client.query({ query: StoreConfigDocument })

  // Fetch product data with configurable options selection (same as Pages Router getStaticProps)
  const productPageData = await client
    .query({
      query: ProductPage2Document,
      variables: { urlKey: url, useCustomAttributes: magentoVersion >= 247 },
    })
    .then((pp) => defaultConfigurableOptionsSelection(url, client, pp.data))

  const product = productPageData.products?.items?.find((p) => p?.url_key === url)

  // If no product found, try to find a redirect or return 404
  if (!product) {
    return redirectOrNotFound(client, storeConfigQuery, { url }, store)
  }

  // Pass server-fetched data to client component for rendering
  // Serialize to plain objects for RSC -> Client Component boundary
  return <ProductClient {...serialize(productPageData)} urlKey={url} />
}
