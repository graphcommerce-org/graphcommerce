import { ItemScroller, ItemScrollerProps, RenderType, responsiveVal } from '@graphcommerce/next-ui'
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
import React, { forwardRef, useContext } from 'react'
import {
  AddProductsToCartContext,
  AddProductsToCartForm,
  AddProductsToCartFormProps,
} from '../AddProductsToCart'
import { ProductListItemProps } from '../ProductListItem/ProductListItem'
import { ProductListItemRenderer, ProductListItemType } from '../ProductListItems/renderer'

export type ProductScrollerProps = {
  title?: string
  items: ProductListItemType[]
  productListRenderer: ProductListItemRenderer
  imageOnly?: ProductListItemProps['imageOnly']
  sx?: SxProps<Theme>
  containerProps?: ContainerProps
  titleProps?: TypographyProps
  addProductsToCartFormProps?: AddProductsToCartFormProps
  itemScrollerProps?: ItemScrollerProps
}
export const ProductScroller = forwardRef<HTMLDivElement, ProductScrollerProps>(
  (props: ProductScrollerProps, ref) => {
    const {
      title = '',
      items,
      productListRenderer,
      imageOnly = false,
      sx = [],
      containerProps,
      titleProps,
      itemScrollerProps,
      addProductsToCartFormProps,
    } = props

    const theme = useTheme()

    const Wrapper = useContext(AddProductsToCartContext) ? React.Fragment : AddProductsToCartForm

    if (!items) return null

    return (
      <Box
        sx={[{ marginBottom: theme.spacings.xxl }, ...(Array.isArray(sx) ? sx : [sx])]}
        ref={ref}
      >
        <Container maxWidth={false} {...containerProps}>
          {title && (
            <Typography variant='h2' sx={{ marginBottom: theme.spacings.sm }} {...titleProps}>
              {title}
            </Typography>
          )}
        </Container>
        {!!items.length && (
          <Wrapper {...addProductsToCartFormProps}>
            <ItemScroller {...itemScrollerProps}>
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
          </Wrapper>
        )}
      </Box>
    )
  },
)
