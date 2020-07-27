import React from 'react'
import ProductListItem from 'components/ProductListItems/ProductListItem'
import ScrollSnapSlider from 'components/ScrollSnapSlider'

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
