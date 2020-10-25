import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'

export default function ProductListItemVirtual(props: GQLProductListItemVirtualFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>
      {sku && <AddToCartButton mutation={AddVirtualProductsToCartDocument} variables={{ sku }} />}
    </ProductListItem>
  )
}
