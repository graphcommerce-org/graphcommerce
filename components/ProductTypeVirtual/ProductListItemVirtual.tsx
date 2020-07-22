import React from 'react'
import ProductListItem from 'components/ProductListItems/ProductListItem'
import AddVirtualProductToCart from './AddVirtualProductToCart'

export default function ProductListItemVirtual(props: GQLProductListItemVirtualFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>
      <AddVirtualProductToCart sku={sku} />
    </ProductListItem>
  )
}
