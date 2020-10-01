import AddToCartButton from 'components/Cart/AddToCartButton'
import ProductListItem from 'components/Product/ProductListItem'
import { AddSimpleProductToCartDocument } from 'generated/documents'
import React from 'react'

export default function ProductListItemSimple(props: GQLProductListItemSimpleFragment) {
  const { sku, name } = props
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddToCartButton<
          GQLAddSimpleProductToCartMutation,
          GQLAddSimpleProductToCartMutationVariables
        >
          mutation={AddSimpleProductToCartDocument}
          variables={{ sku }}
          name={name}
        />
      )}
    </ProductListItem>
  )
}
