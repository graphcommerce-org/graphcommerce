import AddToCartButton from 'components/Cart/AddToCartButton'
import ProductListItem from 'components/Product/ProductListItem'
import { AddBundleProductToCartDocument } from 'generated/apollo'
import React from 'react'

export default function ProductListItemBundle(props: GQLProductListItemSimpleFragment) {
  const { sku, name } = props
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddToCartButton<
          GQLAddBundleProductToCartMutation,
          GQLAddBundleProductToCartMutationVariables
        >
          mutation={AddBundleProductToCartDocument}
          // todo: implement available bundle options.
          variables={{ sku, bundleOptions: [] }}
          name={name}
        />
      )}
    </ProductListItem>
  )
}
