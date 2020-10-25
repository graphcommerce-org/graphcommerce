import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddSimpleProductToCartDocument } from '@reachdigital/magento-customer/node_modules/generated/documents'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'

export default function ProductListItemSimple(props: GQLProductListItemSimpleFragment) {
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
