import {
  UseRecentlyViewedProductsProps,
  useRecentlyViewedProducts,
} from '@graphcommerce/magento-recently-viewed-products/hooks/useRecentlyViewedProducts'
import { useRecentlyViewedSkus } from '@graphcommerce/magento-recently-viewed-products/hooks/useRecentlyViewedSkus'
import { ProductScroller } from './ProductScroller'

export type RecentlyViewedProductsProps = UseRecentlyViewedProductsProps
export function RecentlyViewedProducts({ exclude }: RecentlyViewedProductsProps = {}) {
  const { skus } = useRecentlyViewedSkus({ exclude })
  const { products, loading } = useRecentlyViewedProducts({ exclude })

  if (!loading && !skus.length) {
    return null
  }

  return (
    <ProductScroller
      title='Recently viewed'
      items={products}
      skeletonItemCount={skus.length - products.length}
    />
  )
}
