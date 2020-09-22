import ProductListItem from 'components/Product/ProductListItem'
import React from 'react'
import AddVirtualProductToCart from './AddVirtualProductToCart'

export default function ProductListItemVirtual(props: GQLProductListItemVirtualFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>{sku && <AddVirtualProductToCart sku={sku} />}</ProductListItem>
  )
}
