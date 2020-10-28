import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import React from 'react'
import ProductListItem from './ProductListItem'
import { ProductPageRelatedFragment } from './ProductPageRelated.gql'

export default function ProductPageRelated(props: ProductPageRelatedFragment) {
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
