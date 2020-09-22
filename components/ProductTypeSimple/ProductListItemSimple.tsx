import ProductListItem from 'components/Product/ProductListItem'
import React from 'react'
import AddSimpleProductToCart from './AddSimpleProductToCart'

export default function ProductListItemSimple(props: GQLProductListItemSimpleFragment) {
  const { sku, name } = props
  return (
    <ProductListItem {...props}>
      {sku && <AddSimpleProductToCart sku={sku} name={name} />}
    </ProductListItem>
  )
}
