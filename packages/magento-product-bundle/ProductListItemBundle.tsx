import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemBundleFragment } from './ProductListItemBundle.graphql'

export type ProdustListItemBundleProps = ProductListItemBundleFragment & ProductListItemProps

export default function ProductListItemBundle(props: ProdustListItemBundleProps) {
  const { children } = props

  return <ProductListItem {...props}>{children}</ProductListItem>
}
