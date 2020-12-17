import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddVirtualProductsToCartDocument } from '@reachdigital/magento-product-virtual/AddVirtualProductToCart.gql'
import ProductListItemVirtualBase, {
  ProductListItemVirtualProps,
} from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemVirtual(props: ProductListItemVirtualProps) {
  const { sku } = props
  return (
    <ProductListItemVirtualBase
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    >
      <AddToCartButton mutation={AddVirtualProductsToCartDocument} variables={{ sku: sku ?? '' }} />
    </ProductListItemVirtualBase>
  )
}
