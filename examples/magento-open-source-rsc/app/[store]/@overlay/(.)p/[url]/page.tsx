import { notFound } from 'next/navigation'
import { ProductOverlay } from '../../../../../components/ProductOverlay'
import { ProductPage2Document } from '../../../../../graphql/ProductPage2.gql'
import { getClient } from '../../../../../lib/apollo/client'
import { serialize } from '../../../../../lib/serialize'
import { getStorefrontConfig } from '../../../../../lib/storefront'

type ProductOverlayPageProps = {
  params: Promise<{ store: string; url: string }>
}

/**
 * Intercepted product route - shows product in an overlay when navigating from within the app
 * (e.g., from category page). Direct navigation to /p/[url] will show the full product page
 * instead.
 */
export default async function ProductOverlayPage({ params }: ProductOverlayPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const { data } = await client.query({
    query: ProductPage2Document,
    variables: { urlKey: url },
  })

  const product = data?.products?.items?.[0]

  if (!product) {
    notFound()
  }

  // Serialize to plain object for RSC -> Client Component boundary
  return <ProductOverlay product={serialize(product)} store={store} />
}
