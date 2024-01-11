import {
  AddProductsToCartForm,
  ProductListItemRenderer,
  ProductListItemsFragment,
} from '@graphcommerce/magento-product'
import { ParagraphWithSidebarSlide, RenderType } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import { Asset } from '../../Asset/Asset'
import { RowProductFragment } from '../RowProduct.gql'
import { RichText } from '../../RichText'

type BackstoryProps = RowProductFragment &
  ProductListItemsFragment & { productListItemRenderer: ProductListItemRenderer }

export function Backstory(props: BackstoryProps) {
  const { productCopy, asset, productListItemRenderer, ...productListItems } = props
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
            renderer={productListItemRenderer}
            {...singleItem}
            sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '27vw' }}
          />
        }
      >
        {productCopy?.raw && (
          <RichText
            {...productCopy}
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
