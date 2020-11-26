import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddSimpleProductToCartDocument } from '@reachdigital/magento-product-simple/AddSimpleProductToCart.gql'
import ProductListItemSimpleBase, {
  ProductListItemSimpleProps,
} from '@reachdigital/magento-product-simple/ProductListItemSimple'
import React from 'react'
import Subtitle from '../Subtitle'

export default function ProductListItemSimple(props: ProductListItemSimpleProps) {
  const { name, sku } = props

  return (
    <ProductListItemSimpleBase
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    >
      <AddToCartButton
        mutation={AddSimpleProductToCartDocument}
        variables={{ sku: sku ?? '' }}
        name={name}
      />
    </ProductListItemSimpleBase>
  )
}
