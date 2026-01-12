import { CmsPageDocument } from '@graphcommerce/magento-cms/server'
import {
  extractUrlQuery,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  productListApplyCategoryDefaults,
  ProductListDocument,
} from '@graphcommerce/magento-product/server'
import { StoreConfigDocument } from '@graphcommerce/magento-store/server'
import { revalidate as getRevalidateTime } from '@graphcommerce/next-ui/server'
import { Container, Typography } from '@mui/material'
import type { Metadata } from 'next'
import { CategoryPageDocument } from '../../../graphql/CategoryPage.gql'
import { getClient } from '../../../lib/apollo/client'
import { redirectOrNotFound } from '../../../lib/redirectOrNotFound'
import { serialize } from '../../../lib/serialize'
import { getStorefrontConfig } from '../../../lib/storefront'
import { CategoryContent } from '../c/[...url]/CategoryContent'

/**
 * Enable ISR (Incremental Static Regeneration) for this route. This matches the Pages Router
 * behavior where /[...url] uses getStaticProps with revalidate.
 *
 * The /c/[...url] route remains fully dynamic (SSR) for filter queries.
 */
export const revalidate = getRevalidateTime()

type CatchAllPageProps = {
  params: Promise<{ store: string; url: string[] }>
}

/**
 * Generate metadata for the catch-all page. This handles both category pages and CMS pages that
 * don't have a prefix (like /women instead of /c/women).
 */
export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const [urlPath] = extractUrlQuery({ url })
  if (!urlPath) return { title: 'Page Not Found' }

  // Try to find a category first
  const { data: categoryData } = await client.query({
    query: CategoryPageDocument,
    variables: { url: urlPath },
  })
  const category = categoryData?.categories?.items?.[0]

  if (category) {
    return {
      title: category.meta_title || category.name,
      description: category.meta_description || category.description || undefined,
      keywords: category.meta_keywords || undefined,
    }
  }

  // Try to find a CMS page
  const { data: cmsData } = await client.query({
    query: CmsPageDocument,
    variables: { identifier: urlPath },
  })
  const cmsPage = cmsData?.cmsPage

  if (cmsPage) {
    return {
      title: cmsPage.meta_title || cmsPage.title,
      description: cmsPage.meta_description || undefined,
      keywords: cmsPage.meta_keywords || undefined,
    }
  }

  return { title: 'Page Not Found' }
}

/**
 * Catch-all page component (RSC). This handles:
 *
 * 1. Category pages at root level (e.g., /en/women) - same as /en/c/women
 * 2. CMS pages (e.g., /en/about-us)
 * 3. 404 via redirectOrNotFound when neither matches
 *
 * Layout (header, footer, navigation) is handled by layout.tsx
 */
export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  // Extract URL path and query params
  const [urlPath, query] = extractUrlQuery({ url })
  const storeConfigQuery = client.query({ query: StoreConfigDocument })

  if (!urlPath || !query) {
    return redirectOrNotFound(client, storeConfigQuery, { url }, store)
  }

  // Try to find a category first
  const [{ data: categoryData }, { data: storeConfigData }] = await Promise.all([
    client.query({ query: CategoryPageDocument, variables: { url: urlPath } }),
    storeConfigQuery,
  ])

  const category = categoryData?.categories?.items?.[0]

  // If we found a category, render it using the same CategoryContent as /c/ route
  if (category?.uid) {
    // Fetch filter types for product filtering
    const filterTypes = await getFilterTypes(client)

    // Parse product list params from URL
    const productListParams = parseParams(urlPath, query, filterTypes)
    if (productListParams && !productListParams.filters.category_uid?.in?.[0]) {
      productListParams.filters.category_uid = { in: [category.uid] }
    }

    // Apply category defaults and fetch products
    const appliedParams = productListParams
      ? await productListApplyCategoryDefaults(productListParams, storeConfigData, category)
      : undefined

    const { data: productsData } = appliedParams
      ? await client.query({
          query: ProductListDocument,
          variables: appliedParams,
        })
      : { data: undefined }

    // Fetch filters
    const { data: filtersData } = appliedParams
      ? await client.query({
          query: ProductFiltersDocument,
          variables: appliedParams,
        })
      : { data: undefined }

    // Serialize data for RSC -> Client Component boundary
    return (
      <CategoryContent
        {...serialize(categoryData)}
        {...serialize(productsData)}
        {...serialize(filtersData)}
        filterTypes={serialize(filterTypes)}
      />
    )
  }

  // Try to find a CMS page
  const { data: cmsData } = await client.query({
    query: CmsPageDocument,
    variables: { identifier: urlPath },
  })
  const cmsPage = cmsData?.cmsPage

  // If we found a CMS page, render it
  if (cmsPage) {
    return (
      <Container maxWidth='md' sx={{ py: 4 }}>
        {cmsPage.content_heading && (
          <Typography variant='h1' component='h1' gutterBottom>
            {cmsPage.content_heading}
          </Typography>
        )}
        {cmsPage.content && (
          <Typography component='div' dangerouslySetInnerHTML={{ __html: cmsPage.content }} />
        )}
      </Container>
    )
  }

  // Neither category nor CMS page found - try redirect or 404
  return redirectOrNotFound(client, storeConfigQuery, { url }, store)
}
