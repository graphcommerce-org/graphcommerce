import RichTextParagraphStrongStroked from '@reachdigital/graphcms-ui/RichText/RichTextParagraphStrongStroked'
import ParagraphWithSidebarSlide from '@reachdigital/next-ui/Row/ParagraphWithSidebarSlide'
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
    <ParagraphWithSidebarSlide
      background={<Asset asset={asset} width={328} />}
      slidingItems={<ProductListItems {...singleItem} />}
    >
      <RichTextParagraphStrongStroked {...copy} />
    </ParagraphWithSidebarSlide>
  )
}
