import { ProductScroller, ProductScrollerProps } from '@graphcommerce/magento-product'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  UseRecentlyViewedProductsProps,
  useRecentlyViewedProducts,
  useRecentlyViewedSkus,
} from '../hooks'

export type RecentlyViewedProductsProps = Omit<UseRecentlyViewedProductsProps, 'skip'> &
  Omit<ProductScrollerProps, 'items'> & { loading?: 'lazy' | 'eager' }

export function RecentlyViewedProducts(props: RecentlyViewedProductsProps) {
  const { exclude, title, productListRenderer, loading = 'lazy', ...scrollerProps } = props

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '300px', once: true })
  const { skus } = useRecentlyViewedSkus({ exclude })
  const productList = useRecentlyViewedProducts({ exclude, skip: !isInView && loading === 'lazy' })

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
      items={[...loadingProducts, ...productList.products]}
      {...scrollerProps}
    />
  )
}
