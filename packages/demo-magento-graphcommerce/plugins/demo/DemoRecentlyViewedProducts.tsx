import {
  useRecentlyViewedProducts,
  useRecentlyViewedSkus,
  type RecentlyViewedProductsProps,
} from '@graphcommerce/magento-recently-viewed-products'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import {
  SidebarSlider,
  filterNonNullableKeys,
  RenderType,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const component = 'RecentlyViewedProducts'
export const exported = '@graphcommerce/magento-recently-viewed-products'
export const ifConfig: IfConfig = 'demoMode'

function DemoRecentlyViewedProducts(props: PluginProps<RecentlyViewedProductsProps>) {
  const { exclude, title, productListRenderer, loading = 'lazy' } = props

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '300px', once: true })
  const { skus } = useRecentlyViewedSkus({ exclude })
  const productList = useRecentlyViewedProducts({ exclude, skip: !isInView && loading === 'lazy' })

  if (
    !import.meta.graphCommerce.recentlyViewedProducts?.enabled ||
    (!productList.loading && !skus.length)
  ) {
    return null
  }

  const loadingProducts = [...Array(skus.length - productList.products.length).keys()].map((i) => ({
    __typename: 'Skeleton' as const,
    uid: i.toString(),
  }))

  return (
    <>
      <div ref={ref} />
      <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
        {filterNonNullableKeys([...loadingProducts, ...productList.products]).map((item) => (
          <RenderType
            key={item.uid ?? ''}
            renderer={productListRenderer}
            sizes={responsiveVal(200, 400)}
            titleComponent='h3'
            {...item}
          />
        ))}
      </SidebarSlider>
    </>
  )
}
export const Plugin = DemoRecentlyViewedProducts
