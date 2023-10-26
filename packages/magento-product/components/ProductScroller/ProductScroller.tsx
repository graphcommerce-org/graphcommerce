import { ItemScroller, ItemScrollerProps, RenderType, responsiveVal } from '@graphcommerce/next-ui'
import {
  Box,
  Container,
  ContainerProps,
  Skeleton,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material'
import React, { useContext } from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import {
  AddProductsToCartContext,
  AddProductsToCartForm,
  AddProductsToCartFormProps,
} from '../AddProductsToCart'
import { ProductListItemProps } from '../ProductListItem/ProductListItem'
import { ProductListItemRenderer } from '../ProductListItems/renderer'

export function ProductScrollerItemSkeleton({ imageOnly = false }: { imageOnly?: boolean }) {
  return (
    <Box>
      <Skeleton sx={{ width: '100%', aspectRatio: '1/1', transform: 'none' }} />

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
  )
}

export type ProductScrollerProps = {
  title?: string
  items: ProductListItemFragment[]
  productListRenderer: ProductListItemRenderer
  imageOnly?: ProductListItemProps['imageOnly']
  skeletonItemCount: number
  skeleton?: React.ReactNode
  sx?: SxProps<Theme>
  containerProps?: ContainerProps
  titleProps?: TypographyProps
  addProductsToCartFormProps?: AddProductsToCartFormProps
  itemScrollerProps?: ItemScrollerProps
}
export function ProductScroller(props: ProductScrollerProps) {
  const {
    title = '',
    items,
    productListRenderer,
    imageOnly = false,
    skeletonItemCount = 0,
    skeleton,
    sx = [],
    containerProps,
    titleProps,
    itemScrollerProps,
    addProductsToCartFormProps,
  } = props

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
            {!items.length &&
              [...Array(skeletonItemCount).keys()].map((i) => (
                <React.Fragment key={i}>
                  {skeleton || <ProductScrollerItemSkeleton imageOnly={imageOnly} />}
                </React.Fragment>
              ))}

            {items.map((item) => (
              <RenderType
                key={item.uid}
                renderer={productListRenderer}
                {...item}
                imageOnly={imageOnly}
                sizes={responsiveVal(200, 300)}
              />
            ))}
          </ItemScroller>
        </AddProductsToCartForm>
      )}
    </Box>
  )
}
