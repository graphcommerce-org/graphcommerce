import ProductListItem from 'components/ProductListItems/ProductListItem'
import { GQLProductListItemSimpleFragment } from 'generated/graphql'
import React from 'react'
import AddSimpleProductToCart from './AddSimpleProductToCart'

export default function ProductListItemSimple(props: GQLProductListItemSimpleFragment) {
  const { sku } = props
  return <ProductListItem {...props}>{sku && <AddSimpleProductToCart sku={sku} />}</ProductListItem>
}
