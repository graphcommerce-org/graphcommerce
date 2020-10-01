import AddToCartButton from 'components/Cart/AddToCartButton'
import ProductListItem from 'components/Product/ProductListItem'
import { AddVirtualProductsToCartDocument } from 'generated/documents'
import React from 'react'

export default function ProductListItemVirtual(props: GQLProductListItemVirtualFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>
      {sku && <AddToCartButton mutation={AddVirtualProductsToCartDocument} variables={{ sku }} />}
    </ProductListItem>
  )
}
