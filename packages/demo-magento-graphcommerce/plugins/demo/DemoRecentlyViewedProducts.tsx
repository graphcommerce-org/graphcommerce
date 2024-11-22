import type { ProductListItemType } from '@graphcommerce/magento-product'
import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import {
  useRecentlyViewedProducts,
  useRecentlyViewedSkus,
  type RecentlyViewedProductsProps,
} from '@graphcommerce/magento-recently-viewed-products'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import {
  SidebarSlider,
  filterNonNullableKeys,
  RenderType,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-recently-viewed-products',
  ifConfig: 'demoMode',
}

export function RecentlyViewedProducts(props: PluginProps<RecentlyViewedProductsProps>) {
  const { exclude, title, productListRenderer, loading = 'lazy' } = props

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '300px' })
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

  const items: ProductListItemType[] = productList.loading ? loadingProducts : productList.products

  return (
    <>
      <Box ref={ref} className='recentlyViewedProducts' sx={{ height: '1px' }} />
      {items.length > 0 && (
        <AddProductsToCartForm>
          <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
            {filterNonNullableKeys(items).map((item) => (
              <RenderType
                key={item.uid}
                renderer={productListRenderer}
                sizes={responsiveVal(200, 400)}
                titleComponent='h3'
                {...item}
              />
            ))}
          </SidebarSlider>
        </AddProductsToCartForm>
      )}
    </>
  )
}
