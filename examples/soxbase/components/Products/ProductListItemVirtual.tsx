import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddVirtualProductsToCartDocument } from '@reachdigital/magento-product-virtual/AddVirtualProductToCart.gql'
import ProductListItemVirtualBase, {
  ProductListItemVirtualProps,
} from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import React from 'react'

export default function ProductListItemVirtual(props: ProductListItemVirtualProps) {
  const { sku } = props
  return (
    <ProductListItemVirtualBase {...props} subTitle='By soxbase' aspectRatio={[1, 1]}>
      <AddToCartButton mutation={AddVirtualProductsToCartDocument} variables={{ sku: sku ?? '' }} />
    </ProductListItemVirtualBase>
  )
}
