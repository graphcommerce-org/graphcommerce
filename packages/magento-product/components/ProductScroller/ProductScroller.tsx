import type { ItemScrollerProps } from '@graphcommerce/next-ui'
import { ItemScroller, RenderType, responsiveVal } from '@graphcommerce/next-ui'
import type { ContainerProps, SxProps, Theme, TypographyProps } from '@mui/material'
import { Box, Container, Typography, useTheme } from '@mui/material'
import React, { forwardRef, useContext } from 'react'
import { AddProductsToCartContext, AddProductsToCartForm } from '../AddProductsToCart'
import type { ProductListItemProps } from '../ProductListItem/ProductListItem'
import type { ProductListItemRenderer, ProductListItemType } from '../ProductListItems/renderer'

export type ProductScrollerProps = {
  title?: React.ReactNode
  items: ProductListItemType[]
  productListRenderer: ProductListItemRenderer
  imageOnly?: ProductListItemProps['imageOnly']
  sx?: SxProps<Theme>
  containerProps?: ContainerProps
  titleProps?: TypographyProps
  itemScrollerProps?: Omit<ItemScrollerProps, 'children'>
  sizes?: string
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
      sizes = responsiveVal(200, 300),
    } = props

    const theme = useTheme()

    const Wrapper = useContext(AddProductsToCartContext) ? React.Fragment : AddProductsToCartForm

    if (!items) return null

    return (
      <Box sx={sx} ref={ref}>
        <Container maxWidth={false} {...containerProps}>
          {title && (
            <Typography variant='h2' sx={{ marginBottom: theme.spacings.sm }} {...titleProps}>
              {title}
            </Typography>
          )}
        </Container>
        {!!items.length && (
          <Wrapper>
            <ItemScroller {...itemScrollerProps}>
              {items.map((item) => (
                <RenderType
                  key={item.uid}
                  renderer={productListRenderer}
                  {...item}
                  imageOnly={imageOnly}
                  sizes={sizes}
                />
              ))}
            </ItemScroller>
          </Wrapper>
        )}
      </Box>
    )
  },
)
