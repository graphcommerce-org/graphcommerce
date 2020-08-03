import ProductListItem from 'components/ProductListItems/ProductListItem'
import { GQLProductListItemVirtualFragment } from 'generated/graphql'
import React from 'react'
import AddVirtualProductToCart from './AddVirtualProductToCart'

export default function ProductListItemVirtual(props: GQLProductListItemVirtualFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>{sku && <AddVirtualProductToCart sku={sku} />}</ProductListItem>
  )
}
