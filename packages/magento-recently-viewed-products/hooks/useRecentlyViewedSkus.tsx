import { useQuery } from '@graphcommerce/graphql'
import { RecentlyViewedProductsDocument } from '../graphql/RecentlyViewedProducts.gql'

export type UseRecentlyViewedSkusProps = { exclude?: string[] }

export function useRecentlyViewedSkus(props: UseRecentlyViewedSkusProps = {}) {
  const { exclude } = props
  const { data, loading, previousData } = useQuery(RecentlyViewedProductsDocument, {
    skip: !import.meta.graphCommerce.recentlyViewedProducts?.enabled,
  })
  let skus = (loading ? previousData : data)?.recentlyViewedProducts?.items || []

  // Filter out excluded products (current product page)
  if (exclude)
    skus = skus.filter(
      (item) =>
        item?.sku &&
        !exclude.includes(item.sku) &&
        item?.parentSku &&
        !exclude.includes(item.parentSku),
    )

  return { skus, loading }
}
