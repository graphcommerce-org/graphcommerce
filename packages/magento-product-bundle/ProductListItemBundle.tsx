import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import { AddBundleProductToCartDocument } from 'generated/documents'
import React from 'react'

export default function ProductListItemBundle(props: GQLProductListItemSimpleFragment) {
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
