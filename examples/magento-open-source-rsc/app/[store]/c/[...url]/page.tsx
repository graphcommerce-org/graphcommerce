import {
  extractUrlQuery,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  productListApplyCategoryDefaults,
  ProductListDocument,
} from '@graphcommerce/magento-product/server'
import { StoreConfigDocument } from '@graphcommerce/magento-store/server'
import type { Metadata } from 'next'
import { CategoryPageDocument } from '../../../../graphql/CategoryPage.gql'
import { getClient } from '../../../../lib/apollo/client'
import { redirectOrNotFound } from '../../../../lib/redirectOrNotFound'
import { getStorefrontConfig } from '../../../../lib/storefront'
import { CategoryContent } from './CategoryContent'

type CategoryPageProps = {
  params: Promise<{ store: string; url: string[] }>
}

/** Generate metadata for the category page */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const [urlPath] = extractUrlQuery({ url })
  if (!urlPath) return { title: 'Category Not Found' }

  const { data } = await client.query({
    query: CategoryPageDocument,
    variables: { url: urlPath },
  })

  const category = data?.categories?.items?.[0]

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.meta_title || category.name,
    description: category.meta_description || category.description || undefined,
    keywords: category.meta_keywords || undefined,
  }
}

/**
 * Category page (RSC) - Fetches category data, products, and filters server-side. Passes data to
 * CategoryContent client component for rendering and client-side filtering.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  // Extract URL path and query params
  const [urlPath, query] = extractUrlQuery({ url })
  const storeConfigQuery = client.query({ query: StoreConfigDocument })

  if (!urlPath || !query) {
    return redirectOrNotFound(client, storeConfigQuery, { url }, store)
  }

  // Fetch filter types and store config
  const filterTypes = await getFilterTypes(client)
  const { data: storeConfigData } = await storeConfigQuery

  // Fetch category data
  const { data: categoryData } = await client.query({
    query: CategoryPageDocument,
    variables: { url: urlPath },
  })

  const category = categoryData?.categories?.items?.[0]

  // If no category found, try to find a redirect or return 404
  if (!category?.uid) {
    return redirectOrNotFound(client, storeConfigQuery, { url }, store)
  }

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

  return (
    <CategoryContent
      {...categoryData}
      {...productsData}
      {...filtersData}
      filterTypes={filterTypes}
    />
  )
}
