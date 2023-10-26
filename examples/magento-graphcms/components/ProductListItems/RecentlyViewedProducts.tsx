import { ProductScroller } from '@graphcommerce/magento-product'
import {
  UseRecentlyViewedProductsProps,
  useRecentlyViewedProducts,
} from '@graphcommerce/magento-recently-viewed-products/hooks/useRecentlyViewedProducts'
import { useRecentlyViewedSkus } from '@graphcommerce/magento-recently-viewed-products/hooks/useRecentlyViewedSkus'
import { productListRenderer } from './productListRenderer'

export type RecentlyViewedProductsProps = UseRecentlyViewedProductsProps & { title?: string }
export function RecentlyViewedProducts({ exclude, title }: RecentlyViewedProductsProps = {}) {
  const { skus } = useRecentlyViewedSkus({ exclude })
  const { products, loading } = useRecentlyViewedProducts({ exclude })

  if (!loading && !skus.length) {
    return null
  }

  return (
    <ProductScroller
      productListRenderer={productListRenderer}
      title={title}
      items={products}
      skeletonItemCount={skus.length - products.length}
    />
  )
}
