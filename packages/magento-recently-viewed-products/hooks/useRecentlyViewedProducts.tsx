import { useQuery } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import type { UseRecentlyViewedSkusProps } from './useRecentlyViewedSkus'
import { useRecentlyViewedSkus } from './useRecentlyViewedSkus'

export type UseRecentlyViewedProductsProps = UseRecentlyViewedSkusProps & { skip?: boolean }
export function useRecentlyViewedProducts(props: UseRecentlyViewedProductsProps) {
  const { exclude, skip = false } = props
  let { skus, loading } = useRecentlyViewedSkus()

  const productList = useQuery(ProductListDocument, {
    variables: { onlyItems: true, filters: { sku: { in: skus.map((p) => p.sku).sort() } } },
    skip: loading || !skus.length || skip,
  })

  const productData =
    productList.data?.products?.items || productList.previousData?.products?.items || []

  if (exclude) {
    skus = skus.filter(
      (item) =>
        item?.sku &&
        !exclude.includes(item.sku) &&
        item?.parentSku &&
        !exclude.includes(item.parentSku),
    )
  }

  // Sort products based on the time they were viewed. Last viewed item should be the first item in the array
  const products = skus
    .map((sku) => productData.find((p) => (p?.sku || '') === sku.sku))
    .filter(nonNullable)

  return {
    products,
    loading: loading || productList.loading,
  }
}
