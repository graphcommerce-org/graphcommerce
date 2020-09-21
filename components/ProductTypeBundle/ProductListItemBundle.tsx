import ProductListItem from 'components/Product/ProductListItem'
import React from 'react'
import AddBundleProductToCart from './AddBundleProductToCart'

export default function ProductListItemBundle(props: GQLProductListItemSimpleFragment) {
  const { sku } = props
  return <ProductListItem {...props}>{sku && <AddBundleProductToCart sku={sku} />}</ProductListItem>
}
