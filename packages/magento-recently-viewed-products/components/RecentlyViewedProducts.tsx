import { ProductListItemRenderer, ProductScroller } from '@graphcommerce/magento-product'
import {
  UseRecentlyViewedProductsProps,
  useRecentlyViewedProducts,
  useRecentlyViewedSkus,
} from '../hooks'

export type RecentlyViewedProductsProps = UseRecentlyViewedProductsProps & {
  title?: string
  productListRenderer: ProductListItemRenderer
}
export function RecentlyViewedProducts(props: RecentlyViewedProductsProps) {
  const { exclude, title, productListRenderer } = props
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
