import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { AddBundleProductToCartDocument } from './AddBundleProductToCart.gql'
import { ProductListItemBundleFragment } from './ProductListItemBundle.gql'

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
