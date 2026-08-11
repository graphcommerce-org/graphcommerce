import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { ParagraphWithSidebarSlide, RenderType } from '@graphcommerce/next-ui'
import { Asset, assetWithPoster, RichText } from '@graphcommerce/storyblok-ui'
import { useTheme } from '@mui/material'
import { productListRenderer } from '../../../../ProductListItems/productListRenderer'
import type { RowProductVariantProps } from '../../RowProduct'

export function Backstory(props: RowProductVariantProps) {
  const { blok, items } = props
  const theme = useTheme()
  const singleItem = items?.[(items.length ?? 1) - 1]
  const { asset, poster } = assetWithPoster(blok.asset)

  if (!singleItem) return null

  return (
    <AddProductsToCartForm>
      <ParagraphWithSidebarSlide
        background={
          asset ? (
            <Asset
              asset={asset}
              poster={poster}
              sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }}
            />
          ) : undefined
        }
        slidingItems={
          <RenderType
            renderer={productListRenderer}
            {...singleItem}
            sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '27vw' }}
          />
        }
      >
        {blok.product_copy && (
          <RichText
            content={blok.product_copy}
            sxRenderer={{
              paragraph: {
                typography: { xs: 'body2', md: 'h3' },
                textTransform: 'uppercase',
                maxWidth: '100%',
                fontWeight: 600,
                textAlign: 'left',
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
