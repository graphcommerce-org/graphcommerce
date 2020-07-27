import React from 'react'
import ProductListItem from 'components/ProductListItems/ProductListItem'
import AddSimpleProductToCart from './AddSimpleProductToCart'

export default function ProductListItemSimple(props: GQLProductListItemSimpleFragment) {
  const { sku } = props
  return <ProductListItem {...props}>{sku && <AddSimpleProductToCart sku={sku} />}</ProductListItem>
}
