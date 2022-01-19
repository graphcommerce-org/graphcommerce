import { RichTextParagraphStrongStroked, Asset } from '@graphcommerce/graphcms-ui'
import { ProductListItemsFragment } from '@graphcommerce/magento-product'
import { ParagraphWithSidebarSlide, RenderType } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'

type BackstoryProps = RowProductFragment & ProductListItemsFragment

export function Backstory(props: BackstoryProps) {
  const { productCopy, asset, ...productListItems } = props
  const theme = useTheme()
  const singleItem = productListItems?.items?.[(productListItems.items?.length ?? 1) - 1]

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
          renderer={productListRenderer}
          {...singleItem}
          sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '27vw' }}
        />
      }
    >
      {productCopy?.raw && <RichTextParagraphStrongStroked {...productCopy} />}
    </ParagraphWithSidebarSlide>
  )
}
