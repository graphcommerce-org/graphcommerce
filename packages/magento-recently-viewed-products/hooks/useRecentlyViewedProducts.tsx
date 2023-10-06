import { useQuery } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { useRecentlyViewedSkus } from './useRecentlyViewedSkus'

export function useRecentlyViewedProducts({ exclude }: { exclude?: string[] } = {}) {
  const { skus, loading } = useRecentlyViewedSkus({ exclude })

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
  products = skus.map((sku) => products.find((p) => (p?.sku || '') === sku.sku)).filter(nonNullable)

  return {
    products,
    loading: loading || loadingProducts,
  }
}
