import RichText from '@reachdigital/graphcms-ui/RichText'
import ProductBackstory from '@reachdigital/next-ui/Row/ProductBackstory'
import React from 'react'
import Asset from '../Asset'
import ProductListItems, { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import { RowProductBackstoryFragment } from './RowProductBackstory.gql'

type RowProductBackstoryProps = RowProductBackstoryFragment & ProductListItemsProps

export default function RowProductBackstory(props: RowProductBackstoryProps) {
  const { copy, asset, ...productListItems } = props
  let singleItem = productListItems

  if (productListItems.items) {
    singleItem = {
      ...productListItems,
      items: [productListItems?.items[productListItems.items?.length - 1]],
    }
  }

  return (
    <ProductBackstory
      RichContent={(richTextClasses) => <RichText {...richTextClasses} {...copy} />}
      asset={<Asset asset={asset} width={328} />}
      productListItems={<ProductListItems {...singleItem} />}
    />
  )
}
