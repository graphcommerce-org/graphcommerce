import { useQuery } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { useRecentlyViewedSkus, UseRecentlyViewedSkusProps } from './useRecentlyViewedSkus'

export type UseRecentlyViewedProductsProps = UseRecentlyViewedSkusProps
export function useRecentlyViewedProducts(props: UseRecentlyViewedProductsProps) {
  const { exclude } = props
  const { skus, loading } = useRecentlyViewedSkus({ exclude })

  const productList = useQuery(ProductListDocument, {
    variables: {
      filters: {
        sku: {
          in: skus.map((p) => p.sku).sort(),
        },
      },
    },
    skip: loading || !skus.length,
  })

  const productData =
    productList.data?.products?.items || productList.previousData?.products?.items || []
  // Sort products based on the time they were viewed. Last viewed item should be the first item in the array
  const products = skus
    .map((sku) => productData.find((p) => (p?.sku || '') === sku.sku))
    .filter(nonNullable)

  return {
    products,
    loading: loading || productList.loading,
  }
}
