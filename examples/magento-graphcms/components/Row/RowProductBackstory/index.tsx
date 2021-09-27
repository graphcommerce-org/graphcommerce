import RichTextParagraphStrongStroked from '@graphcommerce/graphcms-ui/RichText/RichTextParagraphStrongStroked'
import { ParagraphWithSidebarSlide, RenderType } from '@graphcommerce/next-ui'
import { useTheme } from '@material-ui/core'
import React from 'react'
import Asset from '../../Asset'
import { ProductListItemsProps } from '../../ProductListItems/ProductListItems'
import renderers from '../../ProductListItems/renderers'
import { RowProductBackstoryFragment } from './RowProductBackstory.gql'

type RowProductBackstoryProps = RowProductBackstoryFragment & ProductListItemsProps

export default function RowProductBackstory(props: RowProductBackstoryProps) {
  const { copy, asset, ...productListItems } = props
  const theme = useTheme()
  const singleItem = productListItems?.items?.[productListItems.items?.length - 1]

  if (!singleItem) return null

  return (
    <ParagraphWithSidebarSlide
      background={
        <Asset asset={asset} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
      }
      slidingItems={
        <RenderType
          renderer={renderers}
          {...singleItem}
          sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '27vw' }}
        />
      }
    >
      <RichTextParagraphStrongStroked {...copy} />
    </ParagraphWithSidebarSlide>
  )
}
