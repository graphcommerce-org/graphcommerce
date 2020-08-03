import ProductListItem from 'components/ProductListItems/ProductListItem'
import { GQLProductListItemSimpleFragment } from 'generated/graphql'
import React from 'react'
import AddBundleProductToCart from './AddBundleProductToCart'

export default function ProductListItemBundle(props: GQLProductListItemSimpleFragment) {
  const { sku } = props
  return <ProductListItem {...props}>{sku && <AddBundleProductToCart sku={sku} />}</ProductListItem>
}
