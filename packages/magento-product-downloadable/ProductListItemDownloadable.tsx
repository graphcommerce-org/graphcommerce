import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { AddDownloadableProductToCartDocument } from './AddDownloadableProductToCart.gql'
import { ProductListItemDownloadableFragment } from './ProductListItemDownloadable.gql'

export default function ProductListItemDownloadable(props: ProductListItemDownloadableFragment) {
  const { sku, name } = props
  // @todo implement logic to select the downloadable product
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddToCartButton
          mutation={AddDownloadableProductToCartDocument}
          variables={{ sku }}
          name={name}
        />
      )}
    </ProductListItem>
  )
}
