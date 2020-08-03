import ProductListItem from 'components/ProductListItems/ProductListItem'
import { GQLProductListItemDownloadableFragment } from 'generated/graphql'
import React from 'react'
import AddDownloadableProductToCart from './AddDownloadableProductToCart'

export default function ProductListItemDownloadable(props: GQLProductListItemDownloadableFragment) {
  const { sku } = props
  // @todo implement logic to select the downloadable product
  return (
    <ProductListItem {...props}>
      {sku && (
        <AddDownloadableProductToCart sku={sku} downloadableProductLinks={[{ link_id: 123 }]} />
      )}
    </ProductListItem>
  )
}
