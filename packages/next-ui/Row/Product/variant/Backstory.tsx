import { Asset, RichText } from '@graphcommerce/graphcms-ui'
import { AddProductsToCartForm, ProductListItemsFragment } from '@graphcommerce/magento-product'
import { RenderType } from '../../../RenderType/'
import { ParagraphWithSidebarSlide } from '../../ParagraphWithSidebarSlide/ParagraphWithSidebarSlide'
import { useTheme } from '@mui/material'
import { productListRenderer } from '../productListRenderer'
import { RowProductProps } from '../type'

type BackstoryProps = RowProductProps & ProductListItemsFragment

export function Backstory(props: BackstoryProps) {
  const { copy, asset, ...productListItems } = props
  const theme = useTheme()
  const singleItem = productListItems?.items?.[(productListItems.items?.length ?? 1) - 1]

  if (!singleItem) return null

  return (
    <AddProductsToCartForm>
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
        {copy?.raw && (
          <RichText
            {...copy}
            sxRenderer={{
              paragraph: {
                typography: { xs: 'body2', md: 'h3' },
                textTransform: 'uppercase' as const,
                maxWidth: '100%',
                fontWeight: 600,
                textAlign: 'left' as const,
                '& strong': {
                  color: 'transparent',
                  WebkitTextStroke: '1.2px #fff',
                },
              },
            }}
          />
        )}
      </ParagraphWithSidebarSlide>
    </AddProductsToCartForm>
  )
}