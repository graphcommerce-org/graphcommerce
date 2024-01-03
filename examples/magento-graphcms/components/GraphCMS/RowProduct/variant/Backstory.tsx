import { AddProductsToCartForm, ProductListItemsFragment } from '@graphcommerce/magento-product'
import { ParagraphWithSidebarSlide, RenderType, Asset, RichText } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'
import { RowProductProps } from '../type'

// type BackstoryProps = RowProductProps & { items?: unknown } & {
//   sku?: string | null | undefined
// }

type BackstoryProps = RowProductFragment & ProductListItemsFragment

export function Backstory(props: BackstoryProps) {
  const { asset, copy, ...productListItems } = props
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
