import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { AddSimpleProductToCartDocument } from './AddSimpleProductToCart.gql'
import { ProductListItemSimpleFragment } from './ProductListItemSimple.gql'

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
