import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import React from 'react'

export default function ProductPageUpsell(props: GQLProductPageUpsellFragment) {
  const { upsell_products } = props

  if (!upsell_products || !upsell_products.length) return null
  return (
    <ScrollSnapSlider>
      {upsell_products.map((product) => {
        if (!product || !product.sku) return null
        return <ProductListItem key={product.sku} {...product} />
      })}
    </ScrollSnapSlider>
  )
}
