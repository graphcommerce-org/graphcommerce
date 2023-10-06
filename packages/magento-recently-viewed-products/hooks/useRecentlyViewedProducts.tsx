import { useQuery } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { useRecentlyViewedSkus } from './useRecentlyViewedSkus'

export function useRecentlyViewedProducts({ exclude }: { exclude?: string[] } = {}) {
  const { skus, loading } = useRecentlyViewedSkus({ exclude })
  const getTimeBySku = (sku: string) => skus.find((s) => s.sku === sku)?.time || 0

  const {
    loading: loadingProducts,
    data,
    previousData,
  } = useQuery(ProductListDocument, {
    variables: {
      filters: {
        sku: {
          in: skus.map((p) => p.sku),
        },
      },
    },
    skip: loading || !skus.length,
  })

  let products = data?.products?.items || previousData?.products?.items || []
  // Sort products based on the time they were viewed. Last viewed item should be the first item in the array
  products = [...products].sort((a, b) =>
    getTimeBySku(b?.sku || '') > getTimeBySku(a?.sku || '') ? 1 : -1,
  )

  return {
    products,
    loading: loading || loadingProducts,
  }
}
