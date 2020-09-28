import AddToCartButton from 'components/Cart/AddToCartButton'
import ProductListItem from 'components/Product/ProductListItem'
import { AddDownloadableProductToCartDocument } from 'generated/apollo'
import React from 'react'

export default function ProductListItemDownloadable(props: GQLProductListItemDownloadableFragment) {
  const { sku, name } = props
  // @todo implement logic to select the downloadable product
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddToCartButton<
          GQLAddDownloadableProductToCartMutation,
          GQLAddDownloadableProductToCartMutationVariables
        >
          mutation={AddDownloadableProductToCartDocument}
          variables={{ sku }}
          name={name}
        />
      )}
    </ProductListItem>
  )
}
