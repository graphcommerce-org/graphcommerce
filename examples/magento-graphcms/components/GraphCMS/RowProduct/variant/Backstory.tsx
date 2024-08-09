import { Asset, RichText } from '@graphcommerce/graphcms-ui'
import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { ParagraphWithSidebarSlide, RenderType } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems'
import { RowProductFragment } from '../graphql/RowProduct.gql'

type BackstoryProps = RowProductFragment

export function Backstory(props: BackstoryProps) {
  const { productCopy, asset, product } = props
  const theme = useTheme()
  if (!product) return null

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
            {...product}
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
