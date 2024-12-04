import type { ProductScrollerProps } from '@graphcommerce/magento-product'
import { ProductScroller } from '@graphcommerce/magento-product'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { UseRecentlyViewedProductsProps } from '../hooks'
import { useRecentlyViewedProducts, useRecentlyViewedSkus } from '../hooks'

export type RecentlyViewedProductsProps = Omit<UseRecentlyViewedProductsProps, 'skip'> &
  Omit<ProductScrollerProps, 'items'> & { loading?: 'lazy' | 'eager' }

export function RecentlyViewedProducts(props: RecentlyViewedProductsProps) {
  const { exclude, title, productListRenderer, loading = 'lazy', ...scrollerProps } = props

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '300px', once: true })
  const { skus } = useRecentlyViewedSkus({ exclude })
  const productList = useRecentlyViewedProducts({
    exclude,
    skip: skus.length === 0 || (!isInView && loading === 'lazy'),
  })

  if (
    !import.meta.graphCommerce.recentlyViewedProducts?.enabled ||
    (!productList.loading && !productList.products.length && isInView)
  ) {
    return null
  }

  const loadingProducts = [...Array(skus.length - productList.products.length).keys()].map((i) => ({
    __typename: 'Skeleton' as const,
    uid: i.toString(),
  }))

  return (
    <ProductScroller
      ref={ref}
      productListRenderer={productListRenderer}
      title={title}
      items={productList.loading ? loadingProducts : productList.products}
      {...scrollerProps}
    />
  )
}
