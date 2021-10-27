import RichTextParagraphStrongStroked from '@graphcommerce/graphcms-ui/RichText/RichTextParagraphStrongStroked'
import { ParagraphWithSidebarSlide, RenderType } from '@graphcommerce/next-ui'
import { useTheme } from '@material-ui/core'
import React from 'react'
import Asset from '../../../Asset'
import { ProductListItemsProps } from '../../../ProductListItems/ProductListItems'
import renderers from '../../../ProductListItems/renderers'
import { RowProductFragment } from '../RowProduct.gql'

type BackstoryProps = RowProductFragment & ProductListItemsProps

export default function Backstory(props: BackstoryProps) {
  const { productCopy, asset, ...productListItems } = props
  const theme = useTheme()
  const singleItem = productListItems?.items?.[productListItems.items?.length - 1]

  if (!singleItem) return null

  return (
    <ParagraphWithSidebarSlide
      background={
        asset && (
          <Asset asset={asset} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
        )
      }
      slidingItems={
        <RenderType
          renderer={renderers}
          {...singleItem}
          sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '27vw' }}
        />
      }
    >
      {productCopy?.raw && <RichTextParagraphStrongStroked {...productCopy} />}
    </ParagraphWithSidebarSlide>
  )
}
