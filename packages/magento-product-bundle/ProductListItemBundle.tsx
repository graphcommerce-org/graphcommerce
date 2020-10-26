import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { AddBundleProductToCartDocument } from './AddBundleProductToCart.graphql'
import { ProductListItemBundleFragment } from './ProductListItemBundle.graphql'

export default function ProductListItemBundle(props: ProductListItemBundleFragment) {
  const { sku, name } = props
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddToCartButton
          mutation={AddBundleProductToCartDocument}
          // todo: implement available bundle options.
          variables={{ sku, bundleOptions: [] }}
          name={name}
        />
      )}
    </ProductListItem>
  )
}
