import {
  AddProductsToCartContext,
  AddProductsToCartForm,
  AddProductsToCartFormProps,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  ItemScroller,
  ItemScrollerProps,
  RenderType,
  breakpointVal,
  responsiveVal,
} from '@graphcommerce/next-ui'
import {
  Box,
  Container,
  ContainerProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material'
import { useContext } from 'react'
import { productListRenderer } from './productListRenderer'

export const skeletonRenderer = {
  Skeleton: ({ imageOnly = false }: { imageOnly?: boolean }) => (
    <Box>
      <Box
        sx={(theme) => ({
          background: 'linear-gradient(45deg, white, #f9f9f9, white)',
          width: '100%',
          aspectRatio: '1/1',
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        })}
      />
      {!imageOnly && (
        <Typography
          variant='subtitle1'
          sx={(theme) => ({
            marginTop: theme.spacings.xs,
            display: 'block',
            color: 'text.primary',
            overflowWrap: 'break-word',
            wordBreak: 'break-all',
            maxWidth: '100%',
            gridArea: 'title',
            fontWeight: 'fontWeightBold',
          })}
        >
          &nbsp;
        </Typography>
      )}
    </Box>
  ),
}

export function ProductScroller({
  title = '',
  items,
  imageOnly = false,
  skeletonItemCount = 0,
  skeleton = skeletonRenderer,
  sx = [],
  containerProps,
  titleProps,
  itemScrollerProps,
  addProductsToCartFormProps,
}: {
  title?: string
  items: Exclude<ProductListQuery['products'], null | undefined>['items']
  imageOnly?: boolean
  skeletonItemCount: number
  skeleton?: typeof skeletonRenderer
  sx?: SxProps<Theme>
  containerProps?: ContainerProps
  titleProps?: TypographyProps
  addProductsToCartFormProps?: AddProductsToCartFormProps
  itemScrollerProps?: ItemScrollerProps
}) {
  const theme = useTheme()

  if (!!useContext(AddProductsToCartContext) && process.env.NODE_ENV !== 'production')
    throw new Error("Can't use ProductScroller inside of AddProductsToCartForm")

  if (!items) return null

  return (
    <Box sx={[{ marginBottom: theme.spacings.xxl }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Container maxWidth={false} {...containerProps}>
        {title && (
          <Typography variant='h2' sx={{ marginBottom: theme.spacings.sm }} {...titleProps}>
            {title}
          </Typography>
        )}
      </Container>
      {(!!items.length || !!skeletonItemCount) && (
        <AddProductsToCartForm {...addProductsToCartFormProps}>
          <ItemScroller {...itemScrollerProps}>
            {(!items || !items.length) &&
              [...Array(skeletonItemCount).keys()].map((i) => {
                const item = {
                  __typename: 'Skeleton',
                }
                return (
                  <RenderType
                    key={i ?? ''}
                    renderer={skeleton}
                    {...item}
                    imageOnly={imageOnly}
                    sizes={responsiveVal(180, 900)}
                  />
                )
              })}

            {items?.map((item) =>
              item ? (
                <RenderType
                  key={item.uid ?? ''}
                  renderer={productListRenderer}
                  {...item}
                  imageOnly={imageOnly}
                  sizes={responsiveVal(180, 900)}
                />
              ) : null,
            )}
          </ItemScroller>
        </AddProductsToCartForm>
      )}
    </Box>
  )
}
