import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { AddVirtualProductsToCartDocument } from './AddVirtualProductToCart.gql'
import { ProductListItemVirtualFragment } from './ProductListItemVirtual.gql'

export default function ProductListItemVirtual(props: ProductListItemVirtualFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>
      {sku && <AddToCartButton mutation={AddVirtualProductsToCartDocument} variables={{ sku }} />}
    </ProductListItem>
  )
}
