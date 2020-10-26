import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { AddSimpleProductToCartDocument } from './AddSimpleProductToCart.graphql'
import { ProductListItemSimpleFragment } from './ProductListItemSimple.graphql'

export default function ProductListItemSimple(props: ProductListItemSimpleFragment) {
  const { sku, name } = props
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddToCartButton
          mutation={AddSimpleProductToCartDocument}
          variables={{ sku }}
          name={name}
        />
      )}
    </ProductListItem>
  )
}
