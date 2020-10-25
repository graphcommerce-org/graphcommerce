import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import React from 'react'

export default function ProductListItemDownloadable(props: GQLProductListItemDownloadableFragment) {
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
