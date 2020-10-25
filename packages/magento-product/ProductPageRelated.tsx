import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import React from 'react'

export default function ProductPageRelated(props: GQLProductPageRelatedFragment) {
  const { related_products } = props

  if (!related_products || !related_products.length) return null
  return (
    <ScrollSnapSlider>
      {related_products.map((product) => {
        if (!product || !product.sku) return null
        return <ProductListItem key={product.sku} {...product} />
      })}
    </ScrollSnapSlider>
  )
}
